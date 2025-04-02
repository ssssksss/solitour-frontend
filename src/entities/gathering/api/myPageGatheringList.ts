import { fetchWithAuth } from "@/shared/api";
import { GatheringList } from "../model/gatheringList";

export async function getMyPageGatheringList(
  category: string,
  currentPage: number,
) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/mypage/gathering/${category}?page=${currentPage - 1}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<GatheringList>;
}
