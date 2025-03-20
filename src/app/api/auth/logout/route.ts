import { fetchWithAuth } from "@/shared/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("access_token");
    // 사용자 정보 조회 API
    await fetchWithAuth(`${process.env.BACKEND_URL}/api/auth/oauth2/logout`, {
      method: "POST",
      headers: {
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    (await cookies()).delete("access_token");
    (await cookies()).delete("refresh_token");
    return new NextResponse("로그아웃", { status: 200 });
  } catch (error) {
    console.error(error);
    (await cookies()).delete("access_token");
    (await cookies()).delete("refresh_token");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
