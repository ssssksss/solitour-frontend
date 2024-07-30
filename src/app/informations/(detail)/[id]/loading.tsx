import PagePath from "@/components/common/PagePath";
import InformationViewerSkeleton from "@/components/skeleton/informations/detail/InformationViewerSkeleton";
import RecommendationListSkeleton from "@/components/skeleton/informations/detail/RecommendationListSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <PagePath first="정보" second="정보 상세" />
      <InformationViewerSkeleton />
      <RecommendationListSkeleton />
    </div>
  );
}
