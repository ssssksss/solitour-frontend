"use server";

import { cookies } from "next/headers";
import { Diary } from "../model/diary";

export interface DiaryInfo {
  diaryContentResponse: Diary;
}

export async function getDiary(diaryId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/diary/${diaryId}`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      next: { revalidate: 60, tags: [`diary/${diaryId}`] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<DiaryInfo>;
}
