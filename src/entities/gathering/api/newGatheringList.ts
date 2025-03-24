"use server";

import { fetchWithAuth } from "@/shared/api";
import { cookies } from "next/headers";
import { Gathering } from "../model/gathering";

export async function getNewGatheringList() {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings/home`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<Gathering[]>;
}
