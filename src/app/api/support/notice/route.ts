import { NextRequest } from "next/server";

/**
 *  공지사항 목록 조회
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";

  // 페이지 번호를 0 기반으로 조정합니다.
  const zeroBasedPage = Number(page) - 1;

  const apiUrl = `${process.env.BACKEND_URL}/api/notice${zeroBasedPage > 0 ? `?page=${zeroBasedPage}` : ""}`;

  // 백엔드 API 호출
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return response;
}
