import GatheringUpdateEditor from "@/components/gathering/edit/GatheringUpdateEditor";
import { GatheringDetailResponseDto } from "@/types/GatheringDto";
import { NextResponse } from "next/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchGatheringData(
  id: number,
): Promise<GatheringDetailResponseDto> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gatherings/${id}`,
      {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("네트워크 응답이 좋지 않습니다.");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { id } = params;
  const postId = Number(id);
  if (postId <= 0 || !Number.isSafeInteger(postId)) {
    throw new Error("페이지를 찾을 수 없습니다.");
  }

  return {
    title: "모임 수정",
    description: "Solitour의 모임 수정 페이지",
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { id } = params;
  const postId = Number(id);

  if (postId <= 0 || !Number.isSafeInteger(postId)) {
    return NextResponse.json(
      { message: "페이지를 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  try {
    const gatheringData = await fetchGatheringData(postId);
    return (
      <div className={"min-h-[calc(100vh-25rem)] w-full pb-[2rem] pt-[2rem]"}>
        <GatheringUpdateEditor gatheringData={gatheringData} />
      </div>
    );
  } catch (error) {
    // 데이터 로딩 실패 시 처리
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl text-red-500">
          데이터를 가져오는 중 오류가 발생했습니다.
        </h1>
      </div>
    );
  }
}
