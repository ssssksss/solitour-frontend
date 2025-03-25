"use server";

import { fetchWithAuth } from "@/shared/api";
import { cookies } from "next/headers";

export async function createBookmark(gatheringId: number) {
  const accessToken = (await cookies()).get("access_token");
  const data = new URLSearchParams();
  data.append("gatheringId", gatheringId.toString());

  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/bookmark/gathering`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
      body: data.toString(),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create data.");
  }
}

export async function deleteBookmark(gatheringId: number) {
  const accessToken = (await cookies()).get("access_token");
  const data = new URLSearchParams();
  data.append("gatheringId", gatheringId.toString());

  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/bookmark/gathering`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
      body: data.toString(),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete data.");
  }
}
