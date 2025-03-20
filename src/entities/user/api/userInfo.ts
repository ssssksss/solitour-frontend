"use server";

import { fetchWithAuth } from "@/shared/api";
import { User } from "../model/user";
import { cookies } from "next/headers";

export async function getUserInfo() {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/users/info`,
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    console.log("ERROR");
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<User>;
}
