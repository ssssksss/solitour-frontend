import { fetchWithAuth } from "@/shared/api";
import { GatheringDetail } from "../model/gathering";

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
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gatherings/${gatheringId}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<GatheringDetail>;
}

export async function createGathering(data: GatheringCreateRequest) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gatherings`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create data.");
  }

  return response.json() as Promise<{ data: { id: number } }>;
}

export async function updateGathering(
  gatheringId: number,
  data: GatheringUpdateRequest,
) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gatherings/${gatheringId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}

export async function deleteGathering(gatheringId: number) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gatherings/${gatheringId}`,
    {
      method: "DELETE",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete data.");
  }
}
