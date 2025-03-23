"use client";

import { GatheringCategory } from "@/entities/gathering";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

interface GatheringCategoryListProps {
  gatheringCategoryListPromise: Promise<GatheringCategory[]>;
}

export const GatheringCategoryList = ({
  gatheringCategoryListPromise,
}: GatheringCategoryListProps) => {
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

  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-wrap items-center gap-1">
        <button
          onClick={() => handleCategoryClick(0)}
          className={`rounded-full px-3 py-[0.375rem] text-sm font-medium hover:scale-105 focus:outline-hidden ${activeGatheringCategoryId == 0 ? "bg-main text-white" : "text-gray1 border border-[#E9EBED]"}`}
        >
          전체
        </button>
        {gatheringCategoryList.map((i) => (
          <button
            key={i.id}
            onClick={() => handleCategoryClick(i.id)}
            className={`rounded-full px-3 py-[0.375rem] text-sm font-medium hover:scale-105 focus:outline-hidden ${activeGatheringCategoryId == i.id ? "bg-main text-white" : "text-gray1 border border-[#E9EBED]"}`}
          >
            {i.name}
          </button>
        ))}
      </div>
    </div>
  );
};
