"use client";

import { usePathname, useSearchParams } from "next/navigation";

export const useInformationPagination = (
  currentPage: number,
  totalPages: number,
) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const parentCategoryId = searchParams.get("parentCategoryId");
  const childCategoryId = searchParams.get("childCategoryId");
  const place = searchParams.get("place");
  const order = searchParams.get("order");
  const tagName = searchParams.get("tagName");
  const search = searchParams.get("search");
  const pageList = Array.from({ length: totalPages }, (_, index) => index + 1);
  const leftPage = Math.max(currentPage - 2, 1);
  const rightPage = Math.min(leftPage + 4, totalPages);

  return {
    pathname,
    parentCategoryId,
    childCategoryId,
    place,
    order,
    tagName,
    search,
    pageList,
    leftPage,
    rightPage,
  };
};
