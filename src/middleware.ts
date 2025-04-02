import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token");
  const refreshToken = request.cookies.get("refresh_token");

  if (!accessToken && refreshToken) {
    const backendResponse = await fetch(
      `${process.env.BACKEND_URL}/api/auth/oauth2/token/refresh`,
      {
        method: "POST",
        headers: { Cookie: `${refreshToken.name}=${refreshToken.value}` },
        cache: "no-store",
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
      const response = NextResponse.redirect(
        new URL("/auth/signin", request.url),
      );
      response.cookies.delete("refresh_token");
      return response;
    }
  }

  // 로그인한 상태에서 로그인 페이지에 접근하려는 경우 홈으로 이동
  if (pathname.startsWith("/auth") && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/informations/write") && !accessToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathname.startsWith("/informations/edit") && !accessToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathname.startsWith("/gathering/write") && !accessToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathname.startsWith("/gathering/edit") && !accessToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathname.startsWith("/diary") && !accessToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathname.startsWith("/mypage") && !accessToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathname.startsWith("/support")) {
    const validMenus = ["about", "notice", "faq", "terms"];
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
    "/",
    "/informations/:path*",
    "/gathering/:path*",
    "/diary/:path*",
    "/auth/:path*",
    "/mypage/:path*",
    "/support",
  ],
};
