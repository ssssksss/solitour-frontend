import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get("access_token");
    if (!cookie) {
      return new NextResponse("Access token not found", { status: 401 });
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/user/info`, {
      method: "GET",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
