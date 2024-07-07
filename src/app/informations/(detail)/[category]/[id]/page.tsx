import PagePath from "@/components/common/PagePath";
import InformationViewer from "@/components/informations/detail/InformationViewer";
import RecommendationList from "@/components/informations/detail/RecommendationList";
import InformationViewerSkeleton from "@/components/skeleton/informations/detail/InformationViewerSkeleton";
import RecommendationListSkeleton from "@/components/skeleton/informations/detail/RecommendationListSkeleton";
import { CATEGORY_TEXT } from "@/constants/informations/category";
import { Suspense } from "react";

type MyProps = {
  params: { category: string; id: string };
};

export async function generateMetadata({ params: { category, id } }: MyProps) {
  const postId = Number(id);
  if (postId <= 0 || !Number.isSafeInteger(postId)) {
    throw Error("Not Found");
  }

  return {
    title: `정보 - ${CATEGORY_TEXT[category]} - ${postId}`,
    description: "Solitour의 정보 상세 페이지",
  };
}

export default function page({ params: { category, id } }: MyProps) {
  if (
    category !== "restaurant" &&
    category !== "accommodation" &&
    category !== "activity"
  ) {
    throw Error("Not Found");
  }

  const postId = Number(id);
  if (postId < 1 || !Number.isSafeInteger(postId)) {
    throw Error("Not Found");
  }

  return (
    <div className="flex flex-col items-center">
      <PagePath first="정보" second={`${CATEGORY_TEXT[category]} 상세`} />
      <Suspense fallback={<InformationViewerSkeleton />}>
        <InformationViewer />
      </Suspense>
      <Suspense fallback={<RecommendationListSkeleton />}>
        <RecommendationList />
      </Suspense>
    </div>
  );
}
