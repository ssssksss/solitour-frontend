"use client";

import DiaryPagination from "@/components/diary/list/DiaryPagination";
import { usePathname } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
}

const DiaryPaginationContainer = ({ currentPage, totalPages }: Props) => {
  const pathname = usePathname();

  return (
    <DiaryPagination
      currentPage={currentPage}
      totalPages={totalPages}
      pathname={pathname}
    />
  );
};

export default DiaryPaginationContainer;
