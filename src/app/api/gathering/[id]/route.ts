import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cookie = request.cookies.get("access_token");
    const bodyData = await request.json();

    // Back-end API 호출
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gatherings/${params.id}`,
      {
        method: "PUT",
        headers: {
          Cookie: `${cookie?.name}=${cookie?.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    await revalidatePath(`/gathering/${params.id}`);
    // return NextResponse.redirect(
    //   new URL(`/getGathering/${params.id}`),
    // );
    
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
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gathering/${params.id}`,
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
    return response;
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to delete data." }), {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
