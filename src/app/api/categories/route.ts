// 카테고리 목록 조회
export async function GET() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/categories`, {
      method: "GET",
      next: { revalidate: 60, tags: ["getCategoryList"] },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
