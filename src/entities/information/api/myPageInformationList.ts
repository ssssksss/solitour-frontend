"use server";

import { fetchWithAuth } from "@/shared/api";
import { InformationList } from "../model/informationList";
import { cookies } from "next/headers";

export async function getMyPageInformationList(
  category: string,
  currentPage: number,
) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/users/mypage/information/${category}?page=${currentPage - 1}`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<InformationList>;
}
