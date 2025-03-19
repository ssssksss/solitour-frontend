"use server";

import { fetchWithAuth } from "@/shared/api";

interface TopGatheringTitle {
  id: number;
  title: string;
}

export async function getTopGatheringTitleList() {
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings/ranks`,
    {
      method: "GET",
      next: { revalidate: 60, tags: ["topGatheringTitleList"] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<TopGatheringTitle[]>;
}
