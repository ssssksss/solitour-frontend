import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    cookies().delete('access_token');
    cookies().delete('refresh_token');
    return new NextResponse("로그아웃", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
