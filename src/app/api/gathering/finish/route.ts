import { NextRequest } from "next/server";


// 모임 신청 종료 및 재활성화
export async function PUT(
  request: NextRequest,
) {
  try {
      const cookie = request.cookies.get("access_token");
      const url = new URL(request.url);
      const params = url.searchParams;
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gatherings/${params.get("isFinish") == "false" ? "finish" : "not-finish"}/${params.get("id")}`,
      {
        method: "PUT",
        headers: {
          Cookie: `${cookie?.name}=${cookie?.value}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to update data." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

