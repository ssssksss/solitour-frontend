import {
  CreateInformationCommentRequestDto,
  UpdateInformationCommentRequestDto,
} from "@/types/InformationCommentDto";
import { NextRequest } from "next/server";

/**
 * @method GET
 * @url /api/informations/comments/:informationId?page=0
 * @description 댓글 목록 조회
 */
export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const cookie = request.cookies.get("access_token");
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") ?? "0";

  return await fetch(
    `${process.env.BACKEND_URL}/api/informations/comments/${params.id}?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      cache: "no-store",
    },
  );
}

/**
 * @method POST
 * @url /api/informations/comments/:informationId
 * @description 댓글 작성
 */
export async function POST(request: NextRequest, props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  const cookie = request.cookies.get("access_token");
  const body: CreateInformationCommentRequestDto = await request.json();
  return await fetch(
    `${process.env.BACKEND_URL}/api/informations/comments/${params.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );
}

/**
 * @method PUT
 * @url /api/informations/comments/:informationId
 * @description 댓글 수정
 */
export async function PUT(request: NextRequest, props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  const cookie = request.cookies.get("access_token");
  const body: UpdateInformationCommentRequestDto = await request.json();
  return await fetch(
    `${process.env.BACKEND_URL}/api/informations/comments/${params.id}`,
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
}

/**
 * @method DELETE
 * @url /api/informations/comments/:informationCommentId
 * @description 댓글 삭제
 */
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  const cookie = request.cookies.get("access_token");
  return await fetch(
    `${process.env.BACKEND_URL}/api/informations/comments/${params.id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      cache: "no-store",
    },
  );
}
