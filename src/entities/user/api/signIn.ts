export async function signIn(code: string) {
  const response = await fetch(`/api/auth/kakao/getToken?code=${code}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to sign in.");
  }

  return response.json();
}
