import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

// 정보 글 작성
export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get("access_token");
    const formData = await request.formData();

    console.log("TEST 정보 글 작성");
    console.log(formData);

    // Back-end API 호출
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/informations`,
      {
        method: "POST",
        body: formData,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Internal Server Error");
    }

    // Revalidate the cache for the list page and redirect the user.
    // TODO: 수정 필요
    revalidateTag("getInformationList");

    return response;
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to write data." }), {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
