import { CreateDiaryRequestDto } from "@/types/DiaryDto";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

// 일기 작성
export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get("access_token");
    const body: CreateDiaryRequestDto = await request.json();

    const response = await fetch(
      `${process.env.LOCAL_BACKEND_URL}/api/diary/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `${cookie?.name}=${cookie?.value}`,
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag("getDiaryList");
    return response;
  } catch (err: any) {
    return new Response(JSON.stringify({ error: "Failed to write data." }), {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
