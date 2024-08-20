import GatheringRecommendationList from "@/components/gathering/GatheringRecommendationList";
import GatheringViewer from "@/components/gathering/GatheringViewer";
import { GatheringDetailResponseDto } from "@/types/GatheringDto";
import { NextResponse } from 'next/server';

interface PageProps {
  params: { id: string };
}

async function fetchGatheringData(id: number): Promise<GatheringDetailResponseDto> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gatherings/${id}`,
      {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-cache",
      },
    );

    if (!response.ok) {
      throw new Error('네트워크 응답이 좋지 않습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
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
    return NextResponse.json({ message: "페이지를 찾을 수 없습니다." }, { status: 404 });
  }

  try {
    const gatheringData = await fetchGatheringData(postId);
    return (
      <div
        className={
          "flex w-full flex-col py-[2rem] min-h-[calc(100vh-25rem)] max-w-[60rem] m-auto"
        }
      >
        <GatheringViewer data={gatheringData} postId={postId} />
        <GatheringRecommendationList data={gatheringData.gatheringRecommend} />
      </div>
    );
  } catch (error) {
    // 데이터 로딩 실패 시 처리
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-xl text-red-500">데이터를 가져오는 중 오류가 발생했습니다.</h1>
      </div>
    );
  }
}
