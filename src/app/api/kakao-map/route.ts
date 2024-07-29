import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.KAKAO_MAPS_API_KEY; // 환경 변수에서 API 키 가져오기

export async function GET(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json(
      { error: "API 키가 설정되어 있지 않습니다." },
      { status: 500 },
    );
  }

  const url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const data = await response.text(); // 원시 스크립트 콘텐츠 얻기
    return new NextResponse(data, {
      status: 200,
      headers: { "Content-Type": "application/javascript" },
    });
  } catch (error) {
    return NextResponse.json({ error: "에러" }, { status: 500 });
  }
}
