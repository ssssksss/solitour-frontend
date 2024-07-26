"use client";

import Pagination from "@/components/common/Pagination";
import { usePathname } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
}

const PaginationContainer = ({ currentPage, totalPages }: Props) => {
  const pathname = usePathname();

  return (
    <Pagination
      pathname={pathname}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
};

export default PaginationContainer;
