import { NextRequest, NextResponse } from 'next/server';

// 요청 데이터의 타입 정의
interface PlaceRegisterRequest {
  searchId: string;
  name: string;
  xAxis: number;
  yAxis: number;
  address: string;
}

interface RequestData {
  placeRegisterRequest: PlaceRegisterRequest;
  gatheringCategoryId: number;
  zoneCategoryNameParent: string;
  zoneCategoryNameChild: string;
  tagRegisterRequests: string; // JSON 문자열로서 해시태그 목록을 나타냄
}

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
    const requestData: RequestData = await request.json();

    const response = await fetch(`${process.env.BACKEND_URL}/api/gatherings`, {
      method: 'POST',
      headers: {
        Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    //  TODO : 에러처리 작업 필요함
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.error || 'Unknown error occurred'}`);
    }
    const resultData = await response.json()
    return NextResponse.json({ data: resultData, message: '데이터가 성공적으로 처리되었습니다.' }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(
        { error: error.message }, 
        { status: 500 }           
      );
    } else {
      return NextResponse.json(
        { error: '알 수 없는 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
  }
}
