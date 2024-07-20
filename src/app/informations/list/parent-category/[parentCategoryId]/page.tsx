import CategoryList from "@/components/informations/list/CategoryList";
import InformationList from "@/components/informations/list/InformationList";
import InformationListSkeleton from "@/components/skeleton/informations/list/InformationListSkeleton";
import { CATEGORY_TEXT } from "@/constants/informations/category";
import { Suspense } from "react";

type MyProps = {
  params: { parentCategoryId: string };
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({
  params: { parentCategoryId },
}: MyProps) {
  return {
    title: `정보 - ${parentCategoryId}`,
    description: "Solitour의 정보 목록 페이지",
  };
}

export default function page({ params, searchParams }: MyProps) {
  const categoryId = Number(params.parentCategoryId);
  if (categoryId <= 0 || !Number.isSafeInteger(categoryId)) {
    throw new Error("Invalid CategoryId");
  }

  return (
    <div className="flex flex-col items-center">
      <Suspense fallback={<div>loading...</div>}>
        <CategoryList categoryId={categoryId} />
      </Suspense>
      <Suspense fallback={<InformationListSkeleton />}>
        <InformationList />
      </Suspense>
    </div>
  );
}
