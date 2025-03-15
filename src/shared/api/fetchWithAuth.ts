import { getNewAccessToken } from "./getNewAccessToken";

export async function fetchWithAuth(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) {
  const response = await fetch(input, init);

  if (response.status === 401) {
    const accessToken = await getNewAccessToken();

    if (!accessToken) {
      return response;
    }

    return await fetch(input, {
      ...init,
      headers: { Cookie: `access_token=${accessToken}` },
    });
  }

  return response;
}
