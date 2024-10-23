import { NextRequest } from "next/server";

/**
 * @method GET
 * @url /api/informations/comments/:informationId?page=0
 * @description 댓글 목록 조회
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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
export async function POST(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const cookie = request.cookies.get("access_token");
  const body = await request.json();
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
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const cookie = request.cookies.get("access_token");
}

/**
 * @method DELETE
 * @url /api/informations/comments/:informationCommentId
 * @description 댓글 삭제
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
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
