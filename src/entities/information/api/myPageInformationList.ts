import { fetchWithAuth } from "@/shared/api";
import { InformationList } from "../model/informationList";

export async function getMyPageInformationList(
  category: string,
  currentPage: number,
) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/mypage/information/${category}?page=${currentPage - 1}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<InformationList>;
}
