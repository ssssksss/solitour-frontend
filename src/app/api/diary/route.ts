// import { revalidateTag } from "next/cache";
// import { NextRequest } from "next/server";

// // 일기 글 작성
// export async function POST(request: NextRequest) {
//   try {
//     const cookie = request.cookies.get("access_token");
//     const formData = await request.formData();

//     // TODO: 삭제 필요
//     console.log("TEST 일기 글 작성");
//     console.log(formData);

//     /*
//     // Back-end API 호출
//     const response = await fetch(`${process.env.BACKEND_URL}/api/diary`, {
//       method: "POST",
//       headers: {
//         Cookie: `${cookie?.name}=${cookie?.value}`,
//       },
//       body: formData,
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error("Internal Server Error");
//     }

//     // Revalidate the cache for the list page and redirect the user;
//     // TODO: 수정 필요
//     revalidateTag("getDiaryList");

//     return response;
//     */

//     // TODO: 삭제 필요
//     return new Response(JSON.stringify({ title: "테스트" }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (e) {
//     return new Response(JSON.stringify({ error: "Failed to write data." }), {
//       status: 500, // Internal Server Error
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }
