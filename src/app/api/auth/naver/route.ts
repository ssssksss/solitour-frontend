import { NextResponse } from "next/server";

function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export function GET() {
  try {
    const clientId = process.env.NAVER_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL;
    const RANDOM_STATE = generateRandomString(150);
    const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format

    if (!clientId || !redirectUri) {
      return NextResponse.redirect("/auth/signin");
    }

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&state=${RANDOM_STATE}`;
    return NextResponse.redirect(naverAuthUrl);
  } catch (error) {
    return NextResponse.redirect("/auth/signin");
  }
}
