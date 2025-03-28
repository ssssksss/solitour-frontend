import { fetchWithAuth } from "@/shared/api";

export async function createGatheringLike(gatheringId: number) {
  const data = new URLSearchParams();
  data.append("gatheringId", gatheringId.toString());

  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gathering/great`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString(),
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create data.");
  }
}

export async function deleteGatheringLike(gatheringId: number) {
  const data = new URLSearchParams();
  data.append("gatheringId", gatheringId.toString());

  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gathering/great`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString(),
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete data.");
  }
}
