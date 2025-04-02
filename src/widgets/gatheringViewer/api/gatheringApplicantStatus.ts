import { fetchWithAuth } from "@/shared/api";

export async function applyGathering(gatheringId: number) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gatherings/applicants/${gatheringId}`,
    {
      method: "POST",
      credentials: "include",
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
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gatherings/applicants/${gatheringId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        gatheringStatus,
      }),
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}

export async function cancelGathering(gatheringId: number) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gatherings/applicants/${gatheringId}`,
    {
      method: "DELETE",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete data");
  }
}
