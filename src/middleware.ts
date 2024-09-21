import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/informations/write") ||
    pathname.startsWith("/informations/edit") ||
    pathname.startsWith("/gathering/write") ||
    pathname.startsWith("/gathering/edit") ||
    pathname.startsWith("/diary") ||
    pathname.startsWith("/mypage") ||
    pathname.startsWith("/support/qna/write") ||
    pathname.startsWith("/support/qna/detail")
  ) {
    const accessToken = request.cookies.get("access_token");
    const refreshToken = request.cookies.get("refresh_token");

    if (!accessToken && refreshToken) {
      const backendResponse = await fetch(
        `${process.env.BACKEND_URL}/api/auth/oauth2/token/refresh`,
        {
          method: "POST",
          headers: {
            Cookie: `${refreshToken.name}=${refreshToken.value}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          cache: "no-store",
          credentials: "include",
        },
      );

      if (backendResponse.status === 200) {
        const accessToken = backendResponse.headers.get("set-cookie");
        const response = NextResponse.next();

        if (accessToken) {
          response.headers.set("set-cookie", accessToken);
        }
        return response;
      } else {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      }
    } else if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // 로그인한 상태에서 로그인 페이지에 접근하려는 경우 홈으로 이동
  if (pathname.startsWith("/auth") && request.cookies.get("access_token")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/support")) {
    const validMenus = ["about", "notice", "faq", "qna", "contact", "terms"];
    const url = new URL(request.url);
    const menu = url.searchParams.get("menu");
    if (!menu && url.pathname == "/support") {
      return NextResponse.redirect(new URL("/404", request.url));
    }
    if (menu && !validMenus.includes(menu)) {
      return NextResponse.redirect(new URL("/404", request.url));
    }
  }

  // 홈 화면인 경우
  const accessToken = request.cookies.get("access_token");
  const refreshToken = request.cookies.get("refresh_token");
  if (!accessToken && refreshToken) {
    const backendResponse = await fetch(
      `${process.env.BACKEND_URL}/api/auth/oauth2/token/refresh`,
      {
        method: "POST",
        headers: {
          Cookie: `${refreshToken.name}=${refreshToken.value}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        cache: "no-store",
        credentials: "include",
      },
    );

    if (backendResponse.status === 200) {
      const accessToken = backendResponse.headers.get("set-cookie");
      const response = NextResponse.next();

      if (accessToken) {
        response.headers.set("set-cookie", accessToken);
      }
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/informations/:path*",
    "/gathering/:path*",
    "/diary/:path*",
    "/auth/:path*",
    "/mypage/:path*",
    "/support",
    "/support/qna/write",
    "/support/qna/detail/:path*",
  ],
};
