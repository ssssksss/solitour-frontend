import { fetchWithAuth } from "@/shared/api";
import { Notice } from "../model/notice";

export async function getNotice(noticeId: number) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notice/${noticeId}`,
    {
      method: "GET",
      credentials: "include",
      next: { revalidate: 60 * 10, tags: [`notice/${noticeId}`] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<Notice>;
}
