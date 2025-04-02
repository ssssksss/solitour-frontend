"use server";

import { fetchWithAuth } from "@/shared/api";
import { cookies } from "next/headers";

export async function deleteAccount(provider: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/auth/oauth2?type=${provider}`,
    {
      method: "DELETE",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete data.");
  }

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}
