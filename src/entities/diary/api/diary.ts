"use server";

import { cookies } from "next/headers";
import { DiaryInfo } from "../model/diary";
import { revalidateTag } from "next/cache";
import { fetchWithAuth } from "@/shared/api";

export interface DiaryCreateRequest {
  title: string;
  titleImage: string;
  startDatetime: Date;
  endDatetime: Date;
  diaryDayRequests: {
    content: string;
    feelingStatus: string;
    diaryDayContentImages: string;
    place: string;
  }[];
}

export interface DiaryUpdateRequest {
  title: string;
  deleteTitleImage: string;
  saveTitleImage: string;
  startDatetime: Date;
  endDatetime: Date;
  diaryDayRequests: {
    content: string;
    feelingStatus: string;
    deleteImagesUrl: string;
    saveImagesUrl: string;
    place: string;
  }[];
}

export async function getDiary(diaryId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/diary/${diaryId}`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      next: { revalidate: 60 * 10, tags: [`diary/${diaryId}`] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<DiaryInfo>;
}

export async function createDiary(data: DiaryCreateRequest) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(`${process.env.BACKEND_URL}/api/diary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${accessToken?.name}=${accessToken?.value}`,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to create data.");
  }

  return response.text();
}

export async function updateDiary(diaryId: number, data: DiaryUpdateRequest) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/diary/${diaryId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }

  revalidateTag(`diary/${diaryId}`);
}

export async function deleteDiary(diaryId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/diary/${diaryId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete data.");
  }

  revalidateTag(`diary/${diaryId}`);
}
