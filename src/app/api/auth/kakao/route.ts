import { NextResponse } from "next/server";

export function GET() {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY : process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
  return NextResponse.redirect(kakaoAuthUrl);
}
