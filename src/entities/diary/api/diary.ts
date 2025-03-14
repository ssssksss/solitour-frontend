import { Diary } from "../model/diary";

export interface DiaryInfo {
  diaryContentResponse: Diary;
}

export async function getDiary(diaryId: number) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/diary/${diaryId}`,
    {
      method: "GET",
      credentials: "include",
      next: { revalidate: 60, tags: [`diary/${diaryId}`] },
    },
  );

  return response.json() as Promise<DiaryInfo>;
}
