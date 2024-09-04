import GatheringRecommendationList from "@/components/gathering/GatheringRecommendationList";
import GatheringViewerContainer from "@/components/gathering/GatheringViewerContainer";
import { GatheringDetailResponseDto } from "@/types/GatheringDto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface PageProps {
  params: { id: string };
}

async function getGathering(id: number): Promise<GatheringDetailResponseDto> {
  const cookie = cookies().get("access_token");
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gatherings/${id}`,
      {
        method: "GET",
        headers: {
          Cookie: `${cookie?.name}=${cookie?.value}`,
        },
        cache: "no-store",
        // next: { revalidate: 60, tags: [`gathering/${id}`] },
      },
    );

    if (!response.ok) {
      throw new Error("네트워크 응답이 좋지 않습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const postId = Number(id);
  if (postId <= 0 || !Number.isSafeInteger(postId)) {
    throw new Error("페이지를 찾을 수 없습니다.");
  }

  return {
    title: `모임 상세페이지`,
    description: "Solitour의 모임 상세 페이지",
  };
}

export default async function Page({ params: { id } }: PageProps) {
  const postId = Number(id);

  if (postId <= 0 || !Number.isSafeInteger(postId)) {
    return NextResponse.json(
      { message: "페이지를 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  
  try {
    const gatheringData = await getGathering(postId);
    return (
      <div
        className={
          "m-auto flex min-h-[calc(100vh-25rem)] w-full max-w-[60rem] flex-col pb-[2.5rem]"
        }
      >
        <GatheringViewerContainer data={gatheringData} postId={postId} />
        <GatheringRecommendationList data={gatheringData.gatheringRecommend} />
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
