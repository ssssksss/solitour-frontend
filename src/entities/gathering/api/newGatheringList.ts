import { fetchWithAuth } from "@/shared/api";
import { Gathering } from "../model/gathering";

export async function getNewGatheringList() {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gatherings/home`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<Gathering[]>;
}
