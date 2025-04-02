"use client";

import { useSearchParams } from "next/navigation";

export const useInformationSort = () => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "";

  const handleSortClick = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete("sort");

    if (value !== "") {
      url.searchParams.set("sort", value);
    }

    window.history.pushState(null, "", url.toString());
  };

  return { sort, handleSortClick };
};
