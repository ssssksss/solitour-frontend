import { fetchWithAuth } from "@/shared/api";

export async function updateNickname(nickname: string) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/nickname`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname }),
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}
