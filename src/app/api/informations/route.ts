import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

// 정보 글 작성
export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get("access_token");
    const formData = await request.formData();

    // Back-end API 호출
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/informations`,
      {
        method: "POST",
        headers: {
          Cookie: `${cookie?.name}=${cookie?.value}`,
        },
        body: formData,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Revalidate the cache
    revalidatePath("/informations/list");
    return response;
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
