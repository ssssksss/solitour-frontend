"use server";

import { fetchWithAuth } from "@/shared/api";
import { Notice } from "../model/notice";
import { cookies } from "next/headers";

export async function getNotice(noticeId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/notice/${noticeId}`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      next: { revalidate: 60 * 10, tags: [`notice/${noticeId}`] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<Notice>;
}
