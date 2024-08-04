import { NextRequest, NextResponse } from "next/server";

// This function can be marked "async" if using "await" inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 사용자가 인증되었는지 확인하고, 인증되지 않은 사용자는
  // 로그인 페이지로 리다이렉트합니다.
  if (
    pathname.startsWith("/informations/write") ||
    pathname.startsWith("/informations/edit") ||
    pathname.startsWith("/diary")
  ) {
    const token = request.cookies.get("access_token");

    // 토큰이 없는 경우 로그인 페이지로 리다이렉트합니다.
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // 이미 로그인된 사용자가 로그인 페이지에 접속하려고 하면
  // 메인 페이지로 리다이렉트합니다.
  if (pathname.startsWith("/auth")) {
    const token = request.cookies.get("access_token");

    // 토큰이 있는 경우 메인 페이지로 리다이렉트합니다.
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로를 설정합니다.
export const config = {
  matchers: [
    "/informations/write",
    "/informations/edit",
    "/diary/:path*",
    "/auth/:path*",
  ],
};
