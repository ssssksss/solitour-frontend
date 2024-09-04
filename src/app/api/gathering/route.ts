import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from "url";

// 모임 검색 조회
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const access_cookie = request.cookies.get("access_token");
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gatherings${params.get("tagName") ? "/tag/search" : ""}` +
        url.search,
      {
        method: "GET",
        headers: {
          Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
      
    if (!response.ok) {
      return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
    return response;
  }
  catch (error) {
    console.error("서버에서 데이터 처리 중 오류 발생:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

// 모임 제거
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const access_cookie = request.cookies.get("access_token");
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gatherings/${params.get("id")}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
    if (!response.ok) {
      return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
    return response;
  } catch (error) {
    console.error("서버에서 데이터 처리 중 오류 발생:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}