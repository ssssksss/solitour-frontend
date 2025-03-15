"use server";

import { cookies } from "next/headers";
import { Diary } from "../model/diary";
import { fetchWithAuth } from "@/shared/api";

interface DiaryList {
  content: Diary[];
  page: { totalPages: number };
}

export async function getDiaryList(page: number) {
  const accessToken = (await cookies()).get("access_token");
  console.log(accessToken);
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/diary?page=${page}`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<DiaryList>;
}
