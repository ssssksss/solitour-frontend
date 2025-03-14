import { CreateDiaryRequestDto } from "@/entities/diary/model/diary";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

// 일기 작성
export async function POST(request: NextRequest) {
  const cookie = request.cookies.get("access_token");
  const body: CreateDiaryRequestDto = await request.json();

  const response = await fetch(`${process.env.BACKEND_URL}/api/diary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  revalidateTag("getDiaryList");
  return response;
}
