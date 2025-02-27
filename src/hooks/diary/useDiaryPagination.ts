"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";

export const useDiaryPagination = (currentPage: number, totalPages: number) => {
  const pathname = usePathname();
  const pageList = useRef(
    Array.from({ length: totalPages }, (_, index) => index + 1),
  );
  const leftPage = useRef(Math.max(currentPage - 2, 1));
  const rightPage = useRef(Math.min(leftPage.current + 4, totalPages));

  return {
    pathname,
    pageList: pageList.current,
    leftPage: leftPage.current,
    rightPage: rightPage.current,
  };
};
