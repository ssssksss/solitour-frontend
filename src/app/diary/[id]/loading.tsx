import Breadcrumbs from "@/components/common/Breadcrumb";
import DiaryViewerSkeleton from "@/components/skeleton/diary/detail/DiaryViewerSkeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col items-center">
      <Breadcrumbs
        categories={[
          { label: "여행 일기", href: "/diary/list?page=1" },
          { label: "일기 상세", href: "" },
        ]}
      />
      <DiaryViewerSkeleton />
    </div>
  );
}
