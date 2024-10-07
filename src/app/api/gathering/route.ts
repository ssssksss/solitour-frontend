import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from "url";

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

  try {
    const requestData = await request.json();
    const response = await fetch(`${process.env.BACKEND_URL}/api/gatherings`, {
      method: "POST",
      headers: {
        Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.error || "Unknown error occurred"}`);
    }
    const resultData = await response.json();
    // 생성시 홈 화면에 new모임 최신화
    revalidateTag("getNewGatheringList");
    return NextResponse.json(
      { data: resultData, message: "데이터가 성공적으로 처리되었습니다." },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "알 수 없는 오류가 발생했습니다." },
        { status: 500 },
      );
    }
  }
}

// 모임 검색 조회
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const access_cookie = request.cookies.get("access_token");

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

  return response;
}

// 모임 제거
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const access_cookie = request.cookies.get("access_token");

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

  revalidateTag("getNewGatheringList");
  revalidatePath("/gathering", "layout");
  revalidatePath("/mypage");
  return response;
}
