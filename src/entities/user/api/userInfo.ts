import { fetchWithAuth } from "@/shared/api";
import { User } from "../model/user";

export async function getUserInfo() {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/info`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch.");
  }

  return response.json() as Promise<User>;
}
