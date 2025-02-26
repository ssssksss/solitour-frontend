import { UpdateDiaryRequestDto } from "@/types/DiaryDto";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

/**
 * 일기 수정
 */
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const cookie = request.cookies.get("access_token");
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

  revalidateTag("getDiaryList");
  revalidateTag(`getDiary/${params.id}`);
  return response;
}

/**
 * 일기 삭제
 */
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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
