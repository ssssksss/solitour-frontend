"use server";

import { cookies } from "next/headers";
import { fetchWithAuth } from "./fetchWithAuth";

export async function uploadImage(file: File, type: "INFORMATION" | "DIARY") {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("type", type);

  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(`${process.env.BACKEND_URL}/api/image`, {
    method: "POST",
    headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
    body: formData,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to upload an image.");
  }

  return response.json() as Promise<{ fileUrl: string }>;
}
