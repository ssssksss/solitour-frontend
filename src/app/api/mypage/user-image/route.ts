import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

  const formData = await request.formData();
    // formData.append("request", JSON.stringify({ userId: 11 }));
    try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/user-image`, {
      method: "POST",
      headers: {
        Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
      },
      body: formData,
    });

    if (response.status != 201) {
      throw new Error(response.statusText);
    }

    return NextResponse.json(await response.json());
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
