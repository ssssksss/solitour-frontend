import CategoryList from "@/components/informations/list/CategoryList";
import InformationList from "@/components/informations/list/InformationList";
import CategoryListSkeleton from "@/components/skeleton/informations/list/CategoryListSkeleton";
import InformationListSkeleton from "@/components/skeleton/informations/list/InformationListSkeleton";
import { Suspense } from "react";

interface Props {
  params: { parentCategoryId: string };
  searchParams: { [key: string]: string | undefined };
}

export default function page({ params, searchParams }: Props) {
  const categoryId = Number(params.parentCategoryId);
  if (categoryId <= 0 || !Number.isSafeInteger(categoryId)) {
    throw new Error("Invalid CategoryId");
  }

  return (
    <div className="flex flex-col items-center">
      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList categoryId={categoryId} />
      </Suspense>
      <Suspense fallback={<InformationListSkeleton />}>
        <InformationList />
      </Suspense>
    </div>
  );
}
