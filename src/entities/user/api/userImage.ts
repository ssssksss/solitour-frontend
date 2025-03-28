import { fetchWithAuth } from "@/shared/api";

export async function updateUserImage(file: File) {
  const formData = new FormData();
  formData.append("userProfile", file);

  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`,
    {
      method: "PUT",
      body: formData,
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}

export async function deleteUserImage() {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`,
    {
      method: "DELETE",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete data.");
  }
}
