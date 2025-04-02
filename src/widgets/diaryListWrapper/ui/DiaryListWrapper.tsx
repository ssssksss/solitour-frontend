import { Suspense } from "react";
import { DiaryList } from "./DiaryList";
import { DiaryListSkeleton } from "./DiaryListSkeleton";

interface DiaryListWrapperProps {
  page: number;
}

export const DiaryListWrapper = ({ page }: DiaryListWrapperProps) => {
  return (
    <Suspense fallback={<DiaryListSkeleton />}>
      <DiaryList page={page} />
    </Suspense>
  );
};
