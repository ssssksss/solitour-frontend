import InformationViewerSkeleton from "@/components/skeleton/informations/detail/InformationViewerSkeleton";
import RecommendationListSkeleton from "@/components/skeleton/informations/detail/RecommendationListSkeleton";
import { Breadcrumbs } from "@/shared/ui/breadcrumb";

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <Breadcrumbs
        categories={[
          {
            label: "정보",
            href: "/informations/list?page=1&parentCategoryId=1",
          },
          { label: "정보 상세", href: "" },
        ]}
      />
      <InformationViewerSkeleton />
      <RecommendationListSkeleton />
    </div>
  );
}
