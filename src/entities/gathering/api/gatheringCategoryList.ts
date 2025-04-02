"use server";

import { fetchWithAuth } from "@/shared/api";

export interface GatheringCategory {
  id: number;
  name: string;
  childrenCategories: {
    id: number;
    parentCategory: { id: number; parentCategory: null; name: string };
    name: string;
  }[];
}

export async function getGatheringCategoryList() {
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/categories/gathering`,
    {
      method: "GET",
      next: { revalidate: 60 * 10, tags: ["gatheringCategoryList"] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<GatheringCategory[]>;
}
