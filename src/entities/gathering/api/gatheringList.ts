"use server";

import { fetchWithAuth } from "@/shared/api";
import { GatheringList } from "../model/gatheringList";
import { cookies } from "next/headers";

export async function getGatheringList(urlSearch: string) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings${urlSearch}`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<GatheringList>;
}

export async function getGatheringListByTagName(urlSearch: string) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings/tag/search${urlSearch}`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<GatheringList>;
}
