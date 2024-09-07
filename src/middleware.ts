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
    const token = request.cookies.get("access_token");
    const refresh_token = request.cookies.get("refresh_token");

    if (!token && refresh_token) {
      const backendResponse = await fetch(
        `${process.env.BACKEND_URL}/api/auth/oauth2/token/refresh`,
        {
          method: "POST",
          headers: {
            Cookie: `${refresh_token.name}=${refresh_token.value}`,
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
    } else if (!token && !refresh_token) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  if (pathname.startsWith("/auth")) {
    const token = request.cookies.get("access_token");

    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/informations/write",
    "/informations/edit",
    "/gathering/write",
    "/gathering/edit/:path*",
    "/diary/:path*",
    "/auth/:path*",
    "/mypage/:path*",
    "/support",
    "/support/qna/write",
    "/support/qna/detail/:path*",
  ],
};
