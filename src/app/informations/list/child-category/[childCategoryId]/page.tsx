import CategoryList from "@/components/informations/list/CategoryList";
import InformationList from "@/components/informations/list/InformationList";
import InformationListSkeleton from "@/components/skeleton/informations/list/InformationListSkeleton";
import { Suspense } from "react";

type MyProps = {
  params: { childCategoryId: string };
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({
  params: { childCategoryId },
}: MyProps) {
  return {
    title: `정보 - ${childCategoryId}`,
    description: "Solitour의 정보 목록 페이지",
  };
}

export default function page({ params, searchParams }: MyProps) {
  const categoryId = Number(params.childCategoryId);
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
