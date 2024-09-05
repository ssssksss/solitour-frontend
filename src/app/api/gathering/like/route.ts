import { NextRequest, NextResponse } from 'next/server';

interface LikeRequestBody {
    isLike: boolean;
}

// 좋아요 추가 함수
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
    
    const url = new URL(request.url);
    
    try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/gathering/great?gatheringId=${url.searchParams.get("id")}`,
          {
            method: "POST",
            headers: {
              Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
              "Content-Type": "application/json",
            },
          },
        );
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response;
    } catch (error) {
        // 에러 응답 반환
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// 좋아요 제거 함수
export async function DELETE(request: NextRequest) {
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

  const url = new URL(request.url);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gathering/great?gatheringId=${url.searchParams.get("id")}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

        return response;
  } catch (error) {
    // 에러 응답 반환
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}