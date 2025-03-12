import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
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

  const data = await request.json();
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/users/nickname`,
      {
        method: "PUT",
        headers: {
          Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return NextResponse.json({ status: 200, message: "닉네임 변경 성공" });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
