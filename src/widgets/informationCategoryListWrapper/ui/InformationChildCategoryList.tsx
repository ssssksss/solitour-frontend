"use client";

import { InformationCategory } from "@/entities/information";
import { useInformationChildCategoryList } from "../model/useInformationChildCategoryList";

interface InformationChildCategoryListProps {
  informationCategoryList: InformationCategory[];
  parentCategoryId: number;
  childCategoryId: number;
}

export const InformationChildCategoryList = ({
  informationCategoryList,
  parentCategoryId,
  childCategoryId,
}: InformationChildCategoryListProps) => {
  const { handleChildCategoryClick } = useInformationChildCategoryList();

  return (
    <div className="flex flex-wrap items-center gap-1">
      <button
        className={[
          childCategoryId === 0
            ? "border-main bg-main text-white"
            : "text-gray1",
          "rounded-full border border-[#E9EBED] px-3 py-1.5 text-sm font-medium hover:scale-105",
        ].join(" ")}
        onClick={() => handleChildCategoryClick(0)}
      >
        전체
      </button>
      {informationCategoryList
        .find((parentCategory) => parentCategory.id === parentCategoryId)
        ?.childrenCategories.map((childCategory) => (
          <button
            key={childCategory.id}
            className={[
              childCategory.id === childCategoryId
                ? "border-main bg-main text-white"
                : "text-gray1",
              "cursor-pointer rounded-full border border-[#E9EBED] px-3 py-1.5 text-sm font-medium hover:scale-105",
            ].join(" ")}
            onClick={() => handleChildCategoryClick(childCategory.id)}
          >
            {childCategory.name}
          </button>
        ))}
    </div>
  );
};
