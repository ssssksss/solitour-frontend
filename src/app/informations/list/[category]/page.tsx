import CategoryLinks from "@/components/informations/CategoryLinks";
import InformationListSkeleton from "@/components/skeleton/informations/InformationListSkeleton";
import { CATEGORY_TEXT } from "@/constants/informations/category";
import InformationListContainer from "@/containers/informations/InformationListContainer";
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
      <CategoryLinks category={params.category} />
      <Suspense
        fallback={
          <InformationListSkeleton
            category={params.category}
            subCategory={searchParams["subCategory"]!}
          />
        }
      >
        <InformationListContainer
          category={params.category}
          subCategory={searchParams["subCategory"]!}
        />
      </Suspense>
    </div>
  );
}
