"use server";

import { fetchWithAuth } from "@/shared/api";
import { Information } from "../model/information";
import { cookies } from "next/headers";

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
  recommendInformation: Information[];
}

export interface InformationCreateRequest {
  informationTitle: string;
  informationAddress: string;
  informationContent: string;
  informationTips: string;
  placeRegisterRequest: {
    searchId: string;
    name: string;
    xAxis: string;
    yAxis: string;
    address: string;
  };
  categoryId: number;
  zoneCategoryNameParent: string;
  zoneCategoryNameChild: string;
  thumbNailImageUrl: string;
  contentImagesUrl: string[];
  tagRegisterRequests: { name: string }[];
}

export interface InformationUpdateRequest {
  title: string;
  address: string;
  content: string;
  tips: string;
  placeModifyRequest: {
    searchId: string;
    name: string;
    xAxis: string;
    yAxis: string;
    address: string;
  };
  categoryId: number;
  zoneCategoryNameParent: string;
  zoneCategoryNameChild: string;
  newThumbNailUrl: { address: string } | null;
  newThumbNailFromContent: { address: string } | null;
  moveThumbNailToContent: { address: string } | null;
  newContentImagesUrl: { address: string }[];
  deleteImagesUrl: { address: string }[];
  tagRegisterRequests: { name: string }[];
}

export async function getInformation(informationId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/informations/${informationId}`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<InformationDetailResponse>;
}

export async function createInformation(data: InformationCreateRequest) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/informations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create data");
  }

  return response.json() as Promise<{ id: number }>;
}

export async function updateInformation(
  informationId: number,
  data: InformationUpdateRequest,
) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/informations/${informationId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
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
}
