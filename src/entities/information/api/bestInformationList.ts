"use server";

import { fetchWithAuth } from "@/shared/api";
import { cookies } from "next/headers";

interface BestInformationInfo {
  informationId: number;
  title: string;
  zoneCategoryParentName: string;
  zoneCategoryChildName: string;
  parentCategoryName: string;
  viewCount: number;
  isBookMark: boolean;
  isLike: boolean;
  thumbNailImage: string;
  likeCount: number;
}

/**
 * 좋아요 순으로 3개월 이내에 만들어진 정보 6개를 조회합니다.
 */
export async function getBestInformationList() {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/informations/main-page`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<BestInformationInfo[]>;
}
