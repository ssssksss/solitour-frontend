"use client";

import GatheringPagination from "@/components/gathering/GatheringPagination";

interface Props {
  currentPage: number;
  totalPages: number;
}

const GatheringPaginationContainer = ({ currentPage, totalPages }: Props) => {
  const pageHandler = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page+"");
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
 }

  return (
    <GatheringPagination
      currentPage={currentPage}
      totalPages={totalPages}
      pageHandler={pageHandler}
    />
  );
};

export default GatheringPaginationContainer;
