import CategoryList from "@/components/informations/list/CategoryList";
import InformationList from "@/components/informations/list/InformationList";
import CategoryListSkeleton from "@/components/skeleton/informations/list/CategoryListSkeleton";
import InformationListSkeleton from "@/components/skeleton/informations/list/InformationListSkeleton";
import { Suspense } from "react";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default function page({ searchParams }: Props) {
  const page = Number(searchParams["page"]);
  if (page <= 0 || !Number.isSafeInteger(page)) {
    throw new Error("Invalid Page Number");
  }

  const parentCategoryId = Number(searchParams["parentCategoryId"]);
  if (parentCategoryId <= 0 || !Number.isSafeInteger(parentCategoryId)) {
    throw new Error("Invalid ParentCategoryId");
  }

  const childCategoryId = Number(searchParams["childCategoryId"] || 0);
  if (childCategoryId < 0 || !Number.isSafeInteger(childCategoryId)) {
    throw new Error("Invalid ChildCategoryId");
  }

  return (
    <div className="flex w-full flex-col items-center">
      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList
          parentCategoryId={parentCategoryId}
          childCategoryId={childCategoryId}
        />
      </Suspense>
      <Suspense fallback={<InformationListSkeleton />}>
        <InformationList
          page={page}
          parentCategoryId={parentCategoryId}
          childCategoryId={childCategoryId}
          place={searchParams["place"]}
          order={searchParams["order"]}
          tagName={searchParams["tagName"]}
          search={searchParams["search"]}
        />
      </Suspense>
    </div>
  );
}
