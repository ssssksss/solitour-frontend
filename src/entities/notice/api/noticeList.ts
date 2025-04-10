"use server";

import { fetchWithAuth } from "@/shared/api";
import { Notice } from "../model/notice";

interface NoticeList {
  content: Notice[];
}

export async function getNoticeList(page: number) {
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/notice?page=${page - 1}`,
    {
      method: "GET",
      next: { revalidate: 60 * 10, tags: ["noticeList"] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json() as Promise<NoticeList>;
}
