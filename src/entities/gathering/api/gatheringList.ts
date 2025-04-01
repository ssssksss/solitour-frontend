import { fetchWithAuth } from "@/shared/api";
import { GatheringList } from "../model/gatheringList";

export async function getGatheringList(urlSearch: string) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gatherings${urlSearch}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<GatheringList>;
}

export async function getGatheringListByTagName(urlSearch: string) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gatherings/tag/search${urlSearch}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<GatheringList>;
}
