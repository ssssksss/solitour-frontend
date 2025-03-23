"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGatheringSort = () => {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSortClick = (value: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("sort");
    if (value) {
      params.set("sort", value);
    }
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    setSort(searchParams.get("sort") || "");
    setLoading(false);
  }, [searchParams]);

  return { loading, sort, handleSortClick };
};
