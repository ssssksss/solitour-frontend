"use server";

import { fetchWithAuth } from "@/shared/api";
import { cookies } from "next/headers";

interface GatheringInfo {
  gatheringId: number;
  title: string;
  zoneCategoryParentName: string;
  zoneCategoryChildName: string;
  viewCount: number;
  isBookMark: boolean;
  likeCount: number;
  gatheringCategoryName: string;
  nickname: string;
  scheduleStartDate: string;
  scheduleEndDate: string;
  deadline: string;
  allowedSex: string;
  startAge: number;
  endAge: number;
  personCount: number;
  nowPersonCount: number;
  isLike: boolean;
}

export async function getNewGatheringList() {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings/home`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<GatheringInfo[]>;
}
