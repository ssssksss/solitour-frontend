import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const access_cookie = request.cookies.get("access_token");
  if (!access_cookie) {
    const refresh_cookie = request.cookies.get("refresh_token");
    if (!refresh_cookie) {
      // 리프레시 토큰이 없으므로 요청 중단
      return new NextResponse("Refresh token not found", { status: 403 });
    }
    // 리프레시 토큰으로 재발급 받아 재요청 보내기 위한 응답
    return new NextResponse("Refresh token not found", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = searchParams.get("page") || "1"; // 기본값을 1로 설정

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/users/mypage/information/${category}${+page > 1 ? "?page=" + page : ""}`,
      {
        method: "GET",
        headers: {
          Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
          "Content-Type": "application/json",
        },
        cache: "no-store"
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
      
    return response;
    // return NextResponse.json({ status: 200, message: "마이페이지 게시물 조회 성공" });
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
