"use client";

import Pagination from "@/components/common/Pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
}

const PaginationContainer = ({ currentPage, totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      pathname={pathname}
      page={Number(searchParams.get("page") ?? 1)}
      place={searchParams.get("place")}
      order={searchParams.get("order")}
    />
  );
};

export default PaginationContainer;
