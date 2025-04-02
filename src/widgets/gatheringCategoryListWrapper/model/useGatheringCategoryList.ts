"use client";

import { GatheringCategory } from "@/entities/gathering";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export const useGatheringCategoryList = (
  gatheringCategoryListPromise: Promise<GatheringCategory[]>,
) => {
  const gatheringCategoryList = use(gatheringCategoryListPromise);
  const searchParams = useSearchParams();
  const [activeGatheringCategoryId, setActiveGatheringCategoryId] = useState(0);

  const handleCategoryClick = (id: number) => {
    setActiveGatheringCategoryId(id);
    const url = new URL(window.location.href);

    if (Number(searchParams.get("category")) !== id) {
      url.searchParams.delete("page");
    }

    if (id === 0) {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", id.toString());
    }

    window.history.pushState(null, "", url.toString());
  };

  useEffect(() => {
    setActiveGatheringCategoryId(+(searchParams.get("category") || 0));
  }, [searchParams]);

  return {
    gatheringCategoryList,
    activeGatheringCategoryId,
    handleCategoryClick,
  };
};
