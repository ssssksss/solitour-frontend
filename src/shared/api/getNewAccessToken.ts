"use server";

import { cookies } from "next/headers";

export async function getNewAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token");

  if (!refreshToken) {
    return null;
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/auth/oauth2/token/refresh`,
    {
      method: "POST",
      headers: { Cookie: `${refreshToken?.name}=${refreshToken?.value}` },
      cache: "no-store",
    },
  );

  const accessToken = response.headers.get("set-cookie")!.slice(13);
  cookieStore.set("access_token", accessToken);

  return accessToken;
}
