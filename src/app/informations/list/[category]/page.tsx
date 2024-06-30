import InformationList from "@/components/informations/InformationList";
import InformationListSkeleton from "@/components/skeleton/informations/InformationListSkeleton";
import { CATEGORY_TEXT } from "@/constants/informations/category";
import CategoryListContainer from "@/containers/informations/CategoryListContainer";
import { Suspense } from "react";

type MyProps = {
  params: { category: string };
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({ params: { category } }: MyProps) {
  return {
    title: `정보 - ${CATEGORY_TEXT[category]}`,
    description: "Solitour의 정보 목록 페이지",
  };
}

export default function page({ params, searchParams }: MyProps) {
  return (
    <div className="flex flex-col items-center">
      <CategoryListContainer
        category={params.category}
        subCategory={searchParams["subCategory"]!}
      />
      <Suspense fallback={<InformationListSkeleton />}>
        <InformationList />
      </Suspense>
    </div>
  );
}
