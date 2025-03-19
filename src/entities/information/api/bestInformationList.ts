"use server";

import { cookies } from "next/headers";

interface BestInformationInfo {
  informationId: number; // 정보 아이디
  title: string; // 제목
  zoneCategoryParentName: string; // 부모 지역 카테고리 이름
  zoneCategoryChildName: string; // 자식 지역 카테고리 이름
  parentCategoryName: string; // 부모 카테고리 이름
  viewCount: number; // 조회수
  isBookMark: boolean; // 북마크 했는지 여부
  isLike: boolean;
  thumbNailImage: string; // 썸네일 이미지 주소
  likeCount: number; // 좋아요 수
}

/**
 * 좋아요 순으로 3개월 이내에 만들어진 정보 6개를 조회합니다.
 */
export async function getBestInformationList() {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/main-page`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      next: { revalidate: 60, tags: ["bestInformationList"] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<BestInformationInfo[]>;
}
