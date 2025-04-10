"use server";

import { fetchWithAuth } from "@/shared/api";
import { cookies } from "next/headers";

export async function applyGathering(gatheringId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings/applicants/${gatheringId}`,
    {
      method: "POST",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create data.");
  }
}

export async function updateGatheringApplicantStatus(
  gatheringStatus: "WAIT" | "CONSENT" | "REFUSE",
  userId: number,
  gatheringId: number,
) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings/applicants/${gatheringId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
      body: JSON.stringify({
        userId,
        gatheringStatus,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}

export async function cancelGathering(gatheringId: number) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/gatherings/applicants/${gatheringId}`,
    {
      method: "DELETE",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete data");
  }
}
