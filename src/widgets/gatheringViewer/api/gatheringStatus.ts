"use server";

import { fetchWithAuth } from "@/shared/api";
import { cookies } from "next/headers";

export async function closeGathering(isFinish: boolean, gatheringId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings/${isFinish === false ? "finish" : "not-finish"}/${gatheringId}`,
    {
      method: "PUT",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}

export async function reopenGathering(gatheringId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings/not-finish/${gatheringId}`,
    {
      method: "PUT",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}
