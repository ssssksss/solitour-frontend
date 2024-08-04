import PagePath from "@/components/common/PagePath";
import DiaryViewer from "@/components/diary/detail/DiaryViewer";
import DiaryViewerSkeleton from "@/components/skeleton/diary/detail/DiaryViewerSkeleton";
import { Suspense } from "react";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Props) {
  const diaryId = Number(id);
  if (diaryId <= 0 || !Number.isSafeInteger(diaryId)) {
    throw Error("Not Found");
  }

  return {
    title: `여행 일기 - ${diaryId}`,
    description: "Solitour의 여행 일기 상세 페이지",
  };
}

export default function page({ params: { id } }: Props) {
  const diaryId = Number(id);
  if (diaryId <= 0 || !Number.isSafeInteger(diaryId)) {
    throw Error("Not Found");
  }

  return (
    <div className="flex w-full flex-col items-center">
      <PagePath first="여행 일기" second="일기 상세" />
      <Suspense fallback={<DiaryViewerSkeleton />}>
        <DiaryViewer id={diaryId} />
      </Suspense>
    </div>
  );
}
