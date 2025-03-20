"use server";

import { fetchWithAuth } from "@/shared/api";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export interface RecommendationInformation {
  informationId: number;
  title: string;
  zoneCategoryParentName: string;
  zoneCategoryChildName: string;
  categoryName: string;
  viewCount: number;
  isBookMark: boolean;
  isLike: boolean;
  thumbNailImage: string;
  likeCount: number;
}

export interface InformationDetailResponse {
  title: string;
  address: string;
  createdDate: Date;
  viewCount: number;
  content: string;
  tip: string;
  userPostingResponse: { id: number; nickname: string };
  tagResponses: { name: string }[];
  placeResponse: {
    searchId: number;
    name: string;
    xaxis: number;
    yaxis: number;
    address: string;
  };
  zoneCategoryResponse: {
    parentZoneCategory: {
      parentZoneCategory: null;
      name: string;
    };
    name: string;
  };
  categoryResponse: {
    id: number;
    parentCategory: {
      id: number;
      parentCategory: null;
      name: string;
    };
    name: string;
  };
  imageResponses: { imageStatus: string; address: string }[];
  likeCount: number;
  userImage: string;
  isLike: boolean;
  recommendInformation: RecommendationInformation[];
}

export async function getInformation(informationId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/informations/${informationId}`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      next: { revalidate: 60, tags: [`information/${informationId}`] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<InformationDetailResponse>;
}

export async function deleteInformation(informationId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/informations/${informationId}`,
    {
      method: "DELETE",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete data");
  }

  revalidateTag("bestInformationList");
  revalidatePath("/informations", "layout");
  return response;
}
