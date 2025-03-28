import { fetchWithAuth } from "./fetchWithAuth";

export async function uploadImage(file: File, type: "INFORMATION" | "DIARY") {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("type", type);

  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to upload an image.");
  }

  return response.json() as Promise<{ fileUrl: string }>;
}
