import { fetchWithAuth } from "@/shared/api";

export async function closeGathering(isFinish: boolean, gatheringId: number) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gatherings/${isFinish === false ? "finish" : "not-finish"}/${gatheringId}`,
    {
      method: "PUT",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}

export async function reopenGathering(gatheringId: number) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gatherings/not-finish/${gatheringId}`,
    {
      method: "PUT",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}
