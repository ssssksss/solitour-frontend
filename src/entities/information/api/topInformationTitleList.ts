"use server";

import { fetchWithAuth } from "@/shared/api";

interface TopInformationTitle {
  id: number;
  title: string;
}

export async function getTopInformationTitleList() {
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/informations/ranks`,
    {
      method: "GET",
      next: { revalidate: 60 * 10, tags: ["topInformationTitleList"] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<TopInformationTitle[]>;
}
