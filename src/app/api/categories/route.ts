// 카테고리 목록 조회
export async function GET() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/categories`, {
    method: "GET",
    next: { revalidate: 60, tags: ["getCategoryList"] },
  });

  return response;
}
