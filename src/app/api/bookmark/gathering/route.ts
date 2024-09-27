import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * 정보 북마크 등록
 */
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

  const cookie = request.cookies.get("access_token");
  const url = new URL(request.url);
  const id = url.searchParams.get("gatheringId");

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/bookmark/gathering?gatheringId=${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      cache: "no-store",
    },
  );

  revalidateTag("getBestGatheringList");
  revalidatePath("/gatherings", "layout");
  return response;
}

/**
 * 정보 북마크 취소
 */
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
  const cookie = request.cookies.get("access_token");
  const url = new URL(request.url);
  const id = url.searchParams.get("gatheringId");

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/bookmark/gathering?gatheringId=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      cache: "no-store",
    },
  );

  revalidateTag("getBestGatheringList");
  revalidatePath("/gatherings", "layout");
  return response;
}
