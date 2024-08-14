import { UpdateDiaryRequestDto } from "@/types/DiaryDto";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

/**
 * 일기 수정
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cookie = request.cookies.get("access_token");
    const body: UpdateDiaryRequestDto = await request.json();

    const response = await fetch(
      `${process.env.LOCAL_BACKEND_URL}/api/diary/update/${params.id}`,
      {
        method: "PUT",
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
    revalidateTag(`getDiary/${params.id}`);
    return response;
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to update data." }), {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
