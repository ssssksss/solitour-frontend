"use client";

import InformationPagination from "@/components/informations/list/InformationPagination";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
}

const InformationPaginationContainer = ({ currentPage, totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <InformationPagination
      currentPage={currentPage}
      totalPages={totalPages}
      pathname={pathname}
      parentCategoryId={searchParams.get("parentCategoryId")}
      childCategoryId={searchParams.get("childCategoryId")}
      place={searchParams.get("place")}
      order={searchParams.get("order")}
    />
  );
};

export default InformationPaginationContainer;
