import CategoryList from "@/components/informations/list/CategoryList";
import InformationList from "@/components/informations/list/InformationList";
import CategoryListSkeleton from "@/components/skeleton/informations/list/CategoryListSkeleton";
import InformationListSkeleton from "@/components/skeleton/informations/list/InformationListSkeleton";
import { Suspense } from "react";

interface Props {
  params: { childCategoryId: string };
  searchParams: { [key: string]: string | undefined };
}

export default function page({ params, searchParams }: Props) {
  const categoryId = Number(params.childCategoryId);
  if (categoryId <= 0 || !Number.isSafeInteger(categoryId)) {
    throw new Error("Invalid CategoryId");
  }

  const page = Number(searchParams["page"]);
  if (page <= 0 || !Number.isSafeInteger(page)) {
    throw new Error("Invalid Page Number");
  }

  return (
    <div className="flex flex-col items-center">
      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList categoryId={categoryId} />
      </Suspense>
      <Suspense fallback={<InformationListSkeleton />}>
        <InformationList
          isParentCategory={false}
          categoryId={categoryId}
          page={page}
          place={searchParams["place"]}
          order={searchParams["order"]}
        />
      </Suspense>
    </div>
  );
}
