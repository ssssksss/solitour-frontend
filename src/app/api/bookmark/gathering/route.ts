import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

/**
 * 정보 북마크 등록
 */
export async function POST(request: NextRequest) {
  const cookie = request.cookies.get("access_token");
  const body = await request.formData();

  const data = new URLSearchParams();
  data.append("infoId", body.get("infoId")?.toString() ?? "0");

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/bookmark/gathering`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      body: data.toString(),
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
  const cookie = request.cookies.get("access_token");
  const body = await request.formData();
  const data = new URLSearchParams();
  data.append("infoId", body.get("info")?.toString() ?? "0");

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/bookmark/gathering?infoId=${body.get("infoId")}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      body: data.toString(),
      cache: "no-store",
    },
  );

  revalidateTag("getBestGatheringList");
  revalidatePath("/gatherings", "layout");
  return response;
}
