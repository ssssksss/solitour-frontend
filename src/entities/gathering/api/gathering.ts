"use server";

import { fetchWithAuth } from "@/shared/api";
import { GatheringDetail } from "../model/gathering";
import { cookies } from "next/headers";

export interface GatheringCreateRequest {
  title: string;
  content: string;
  startAge: number;
  endAge: number;
  personCount: number;
  deadline: string;
  scheduleStartDate: string;
  scheduleEndDate: string;
  openChattingUrl: string;
  placeRegisterRequest: {
    searchId: string;
    name: string;
    xAxis: number;
    yAxis: number;
    address: string;
  };
  allowedSex: string;
  gatheringCategoryId: number;
  zoneCategoryNameParent: string;
  zoneCategoryNameChild: string;
  tagRegisterRequests: { name: string }[];
}

export interface GatheringUpdateRequest {
  title: string;
  content: string;
  startAge: number;
  endAge: number;
  personCount: number;
  deadline: string;
  scheduleStartDate: string;
  scheduleEndDate: string;
  openChattingUrl: string;
  placeModifyRequest: {
    searchId: string;
    name: string;
    xAxis: number;
    yAxis: number;
    address: string;
  };
  allowedSex: string;
  gatheringCategoryId: number;
  zoneCategoryNameParent: string;
  zoneCategoryNameChild: string;
  tagRegisterRequests: { name: string }[];
}

export async function getGathering(gatheringId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings/${gatheringId}`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<GatheringDetail>;
}

export async function createGathering(data: GatheringCreateRequest) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings`,
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
    throw new Error("Failed to create data.");
  }

  return response.json() as Promise<{ id: number }>;
}

export async function updateGathering(
  gatheringId: number,
  data: GatheringUpdateRequest,
) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings/${gatheringId}`,
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

export async function deleteGathering(gatheringId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings/${gatheringId}`,
    {
      method: "DELETE",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete data.");
  }
}
