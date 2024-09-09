import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cookie = request.cookies.get("access_token");

    // Back-end API 호출
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gatherings/${params.id}`,
      {
        method: "GET",
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
