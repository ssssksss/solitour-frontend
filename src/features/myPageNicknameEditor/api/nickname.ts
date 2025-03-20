"use server";

import { fetchWithAuth } from "@/shared/api";
import { cookies } from "next/headers";

export async function updateNickname(nickname: string) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/users/nickname`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
      body: JSON.stringify({ nickname }),
    },
  );

  return response.status;
}
