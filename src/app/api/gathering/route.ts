import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from "url";

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
