import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

/**
 * 정보 글 가져오기
 *
 * 이 API는 정보 글 수정 목적으로 데이터를
 * 클라이언트 사이드에서 요청할 때 사용됩니다.
 *
 * 정보 상세 페이지에서 데이터를 가져올 때
 * 사용되지 않습니다.
 * @param request
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // TODO: 추후 수정할 것.

    /*
    const response = await fetch(
      `${process.env.BACKEND_API}/api/informations/${params.id}`,
      {
        method: "GET",
        cache: "force-cache",
        next: { tags: [`getInformation/${params.id}`] },
      },
    );

    if (!response.ok) {
      throw new Error("Internal Server Error");
    }

    return response;
    */

    return new Response(
      JSON.stringify({
        informationTitle: "테스트 제목입니다.",
        informationContent: "테스트 내용입니다.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to fetch data." }), {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

/**
 * 정보 글 수정
 * @param request
 * @param params
 * @returns
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const formData = await request.formData();

    // TODO: 삭제 필요
    console.log("TEST 정보 글 수정");
    console.log(formData);

    /*
    // Back-end API 호출
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/informations/${params.id}`,
      {
        method: "PUT",
        body: formData,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Internal Server Error");
    }

    // Revalidate the cache for the list page and redirect the user.
    // TODO: 수정 필요
    revalidateTag("getInformationList");
    revalidateTag(`getInformation/${id}`)

    // 외부 API의 응답을 JSON 형식으로 변환
    return response;
    */

    // TODO: 삭제 필요
    return new Response(
      JSON.stringify({ title: "1", content: "2", tips: ["3", "4"] }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to write data." }), {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
