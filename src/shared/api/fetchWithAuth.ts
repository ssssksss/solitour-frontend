export async function fetchWithAuth(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) {
  const response = await fetch(input, init);

  if (response.status === 401) {
    // 토큰 갱신
    const data = await fetch("/api/auth/refresh-access-token", {
      method: "POST",
    });

    if (data.status !== 200) {
      return Promise.reject({
        status: data.status,
        message: "실패",
      });
    }

    return await fetch(input, init);
  }

  return response;
}
