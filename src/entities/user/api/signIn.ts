export async function signIn(code: string) {
  const response = await fetch(`/api/auth/kakao/getToken?code=${code}`, {
    method: "GET",
    cache: "no-store",
  });

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/oauth2/login?type=kakao&redirectUrl=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&code=${code}`,
  //   { method: "GET", cache: "no-store" },
  // );

  if (!response.ok) {
    throw new Error("Failed to sign in.");
  }

  return response.json();
}
