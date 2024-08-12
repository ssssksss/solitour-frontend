import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID가 제공되지 않았습니다.' }, { status: 400 });
    }
    
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
    const response = await fetch(`${process.env.BACKEND_URL}/api/gatherings/${id}`, {
    method: "GET",
    headers: {
      Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
    });
  }
  } catch (error) {
    console.error('서버에서 데이터 처리 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
