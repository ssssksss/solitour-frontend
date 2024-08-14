import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

/**
 * 일기 삭제
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cookie = request.cookies.get("access_token");
    const response = await fetch(
      `${process.env.LOCAL_BACKEND_URL}/api/diary/delete/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `${cookie?.name}=${cookie?.value}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag("getDiaryList");
    return response;
  } catch (err) {
    return new Response("Failed to delete data.", {
      status: 500, // Internal Server Error,
    });
  }
}
