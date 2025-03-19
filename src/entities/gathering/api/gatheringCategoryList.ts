"use server";

import { fetchWithAuth } from "@/shared/api";
import { GatheringCategory } from "../model/gatheringCategory";

export async function getGatheringCategoryList() {
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/categories/gathering`,
    {
      method: "GET",
      next: { revalidate: 60, tags: ["gatheringCategoryList"] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<GatheringCategory[]>;
}
