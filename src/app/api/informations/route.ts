import { CreateInformationRequestDto } from "@/types/InformationDto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

// 정보 글 작성
export async function POST(request: NextRequest) {
  const cookie = request.cookies.get("access_token");
  const body: CreateInformationRequestDto = await request.json();

  // Back-end API 호출
  const response = await fetch(`${process.env.BACKEND_URL}/api/informations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  // Revalidate the cache
  revalidateTag("getBestInformationList");
  revalidatePath("/informations", "layout");
  return response;
}
