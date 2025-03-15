export async function fetchWithAuth(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) {
  const response = await fetch(input, init);

  if (response.status === 401) {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/oauth2/token/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    return await fetch(input, init);
  }

  return response;
}
