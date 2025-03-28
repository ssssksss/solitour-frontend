import { Diary } from "../model/diary";
import { fetchWithAuth } from "@/shared/api";

interface DiaryList {
  content: Diary[];
  page: { totalPages: number };
}

export async function getDiaryList(page: number) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/diary?page=${page}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<DiaryList>;
}
