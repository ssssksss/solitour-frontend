"use server";

import { fetchWithAuth } from "@/shared/api";
import { cookies } from "next/headers";

export async function createInformationBookmark(informationId: number) {
  const accessToken = (await cookies()).get("access_token");
  const data = new URLSearchParams();
  data.append("infoId", informationId.toString());

  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/bookmark/information`,
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

export async function deleteInformationBookmark(informationId: number) {
  const accessToken = (await cookies()).get("access_token");
  const data = new URLSearchParams();
  data.append("infoId", informationId.toString());

  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/bookmark/information`,
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
