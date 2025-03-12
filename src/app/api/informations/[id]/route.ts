import { UpdateInformationRequestDto } from "@/types/InformationDto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

/**
 * 정보 글 가져오기
 *
 * 이 API는 정보 글 수정 목적으로 데이터를
 * 클라이언트 사이드에서 요청할 때 사용됩니다.
 *
 * 정보 상세 페이지에서 데이터를 가져올 때
 * 사용되지 않습니다.
 *
 * @param request
 */
export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/${params.id}`,
    {
      method: "GET",
      next: { revalidate: 60, tags: [`getInformation/${params.id}`] },
    },
  );

  return response;
}

/**
 * 정보 글 수정
 *
 * @param request
 * @param params
 * @returns
 */
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const cookie = request.cookies.get("access_token");
  const body: UpdateInformationRequestDto = await request.json();

  // Back-end API 호출
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/${params.id}`,
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

  // Revalidate the cache
  revalidateTag("getBestInformationList");
  revalidatePath("/informations", "layout");
  return response;
}

/**
 * 정보 글 삭제
 */
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const cookie = request.cookies.get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/${params.id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      cache: "no-store",
    },
  );

  revalidateTag("getBestInformationList");
  revalidatePath("/informations", "layout");
  return response;
}
