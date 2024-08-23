import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const queryString = request.url.substring(
    request.url.indexOf("/api/gathering") + 14,
  );
  const access_cookie = request.cookies.get("access_token");

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gatherings` + queryString,
      {
        method: "GET",
        headers: {
          Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (response.status === 200) {
      const data = await response.json();
      return new NextResponse(JSON.stringify(data), {
        status: 200,
      });
    }
  } catch (error) {
    console.error("서버에서 데이터 처리 중 오류 발생:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
