import CategoryList from "@/components/informations/list/CategoryList";
import InformationList from "@/components/informations/list/InformationList";
import InformationListSkeleton from "@/components/skeleton/informations/list/InformationListSkeleton";
import { CATEGORY_TEXT } from "@/constants/informations/category";
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
      <Suspense fallback={<div>loading...</div>}>
        <CategoryList categoryId={1} /> {/* TODO */}
      </Suspense>
      <Suspense fallback={<InformationListSkeleton />}>
        <InformationList />
      </Suspense>
    </div>
  );
}
