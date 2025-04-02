"use client";

import { GatheringCategory } from "@/entities/gathering";
import { useGatheringCategoryList } from "../model/useGatheringCategoryList";

interface GatheringCategoryListProps {
  gatheringCategoryListPromise: Promise<GatheringCategory[]>;
}

export const GatheringCategoryList = ({
  gatheringCategoryListPromise,
}: GatheringCategoryListProps) => {
  const {
    gatheringCategoryList,
    activeGatheringCategoryId,
    handleCategoryClick,
  } = useGatheringCategoryList(gatheringCategoryListPromise);

  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-wrap items-center gap-1">
        <button
          className={[
            activeGatheringCategoryId == 0
              ? "bg-main text-white"
              : "text-gray1 border border-[#E9EBED]",
            "rounded-full px-3 py-1.5 text-sm font-medium hover:scale-105 focus:outline-hidden",
          ].join(" ")}
          onClick={() => handleCategoryClick(0)}
        >
          전체
        </button>
        {gatheringCategoryList.map((gatheringCategory) => (
          <button
            key={gatheringCategory.id}
            className={[
              activeGatheringCategoryId == gatheringCategory.id
                ? "bg-main text-white"
                : "text-gray1 border border-[#E9EBED]",
              "rounded-full px-3 py-1.5 text-sm font-medium hover:scale-105 focus:outline-hidden",
            ].join(" ")}
            onClick={() => handleCategoryClick(gatheringCategory.id)}
          >
            {gatheringCategory.name}
          </button>
        ))}
      </div>
    </div>
  );
};
