import PagePath from "@/components/common/PagePath";
import DiaryViewerSkeleton from "@/components/skeleton/diary/detail/DiaryViewerSkeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col items-center">
      <PagePath first="여행 일기" second="일기 상세" />
      <DiaryViewerSkeleton />
    </div>
  );
}
