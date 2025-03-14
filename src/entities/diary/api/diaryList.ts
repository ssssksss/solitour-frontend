import { Diary } from "../model/diary";

interface DiaryList {
  content: Diary[];
  page: { totalPages: number };
}

export async function getDiaryList(page: number) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/diary?page=${page}`,
    {
      method: "GET",
      credentials: "include",
      next: { revalidate: 60, tags: ["diaryList"] },
    },
  );

  return response.json() as Promise<DiaryList>;
}
