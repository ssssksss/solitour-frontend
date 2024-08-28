import { NextRequest } from "next/server";


export async function POST(
  request: NextRequest,
) {
  try {
    const cookie = request.cookies.get("access_token");
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gatherings/applicants/${id}`,
      {
        method: "POST",
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

export async function PUT(
  request: NextRequest,
) {
  try {
    const cookie = request.cookies.get("access_token");
    const data = await request.json();

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gatherings/applicants/${data.applyId}`,
      {
        method: "PUT",
        headers: {
          Cookie: `${cookie?.name}=${cookie?.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.userId,
          gatheringStatus: data.gatheringStatus,
        }),
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

//  * 모임 글 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cookie = request.cookies.get("access_token");
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    // Back-end API 호출
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gatherings/applicants/${id}`,
      {
        method: "DELETE",
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
