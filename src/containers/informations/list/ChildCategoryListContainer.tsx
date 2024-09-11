"use client";

import ChildCategoryList from "@/components/informations/list/ChildCategoryList";
import { CategoryResponseDto } from "@/types/CategoryDto";
import { useSearchParams } from "next/navigation";

interface Props {
  categories: CategoryResponseDto[];
  parentCategoryId: number;
  childCategoryId: number;
}

const ChildCategoryListContainer = ({
  categories,
  parentCategoryId,
  childCategoryId,
}: Props) => {
  const searchParams = useSearchParams();

  return (
    <ChildCategoryList
      categories={categories}
      parentCategoryId={parentCategoryId}
      childCategoryId={childCategoryId}
      place={searchParams.get("place")}
      order={searchParams.get("order")}
      tagName={searchParams.get("tagName")}
      search={searchParams.get("search")}
    />
  );
};

export default ChildCategoryListContainer;
