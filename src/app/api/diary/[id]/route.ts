import { UpdateDiaryRequestDto } from "@/types/DiaryDto";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * 일기 수정
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!request.cookies.get("access_token")) {
    const refreshToken = request.cookies.get("refresh_token");
    if (!refreshToken) {
      return new NextResponse("접근 권한이 존재하지 않습니다.", {
        status: 401,
      });
    }

    const backendResponse = await fetch(
      `${process.env.BASE_URL}/api/auth/refresh-access-token`,
      {
        method: "POST",
        headers: {
          Cookie: `${refreshToken.name}=${refreshToken.value}`,
        },
        cache: "no-store",
      },
    );

    const accessToken = backendResponse.headers.get("set-cookie");
    request.cookies.set("access_token", accessToken!);
  }

  const cookie = request.cookies.get("access_token");
  console.log(cookie);
  const body: UpdateDiaryRequestDto = await request.json();

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/diary/${params.id}`,
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
}

/**
 * 일기 삭제
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const cookie = request.cookies.get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/diary/${params.id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      cache: "no-store",
    },
  );

  revalidateTag("getDiaryList");
  revalidateTag(`getDiary/${params.id}`);
  return response;
}
