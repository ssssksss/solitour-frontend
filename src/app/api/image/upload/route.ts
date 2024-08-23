import { NextRequest } from "next/server";

// 이미지 업로드
export async function POST(request: NextRequest) {
  const cookie = request.cookies.get("access_token");
  const formData = await request.formData();

  const response = await fetch(`${process.env.BACKEND_URL}/api/image`, {
    method: "POST",
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
    body: formData,
    cache: "no-store",
  });

  return response;
}
