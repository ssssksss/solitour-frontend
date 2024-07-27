import { NextResponse } from "next/server";

export function GET() {
  const clientId = process.env.KAKAO_REST_API_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;

  if (!clientId || !redirectUri) {
    console.error("Environment variables are not set correctly");
    return new Response("Environment variables are not set correctly", {
      status: 500,
    });
  }

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  console.log("Redirecting to:", kakaoAuthUrl); // URL 확인을 위한 로그

  return NextResponse.redirect(kakaoAuthUrl);
}
