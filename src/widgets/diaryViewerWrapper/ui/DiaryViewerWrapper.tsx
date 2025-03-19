import { Suspense } from "react";
import { DiaryViewerSkeleton } from "./DiaryViewerSkeleton";
import { DiaryViewer } from "./DiaryViewer";
import { getDiary } from "@/entities/diary";

interface DiaryViewerWrapperProps {
  diaryId: number;
}

export const DiaryViewerWrapper = ({ diaryId }: DiaryViewerWrapperProps) => {
  const diaryInfoPromise = getDiary(diaryId);

  return (
    <Suspense fallback={<DiaryViewerSkeleton />}>
      <DiaryViewer diaryInfoPromise={diaryInfoPromise} />
    </Suspense>
  );
};
