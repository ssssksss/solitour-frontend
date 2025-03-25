"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useInformationSort = () => {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("");

  const handleSortClick = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete("sort");

    if (value !== "") {
      url.searchParams.set("sort", value);
    }

    window.history.pushState(null, "", url.toString());
  };

  useEffect(() => {
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  return { sort, handleSortClick };
};
