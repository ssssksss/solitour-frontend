"use client";

import { InformationCategory } from "@/entities/information";
import { useInformationParentCategoryList } from "../model/useInformationParentCategoryList";

interface InformationParentCategoryListProps {
  informationCategoryList: InformationCategory[];
  parentCategoryId: number;
}

export const InformationParentCategoryList = ({
  informationCategoryList,
  parentCategoryId,
}: InformationParentCategoryListProps) => {
  const { handleParentCategoryClick } = useInformationParentCategoryList();

  return (
    <div className="mt-22 flex w-full flex-row items-center justify-between border-b">
      <nav className="w-fit">
        <ul className="flex flex-row items-center gap-9">
          {informationCategoryList.map((informationCategory) => (
            <button
              key={informationCategory.id}
              className={[
                informationCategory.id === parentCategoryId
                  ? "border-main text-main border-b-2 font-bold"
                  : "text-gray1",
                "hover:text-main pb-1.5",
              ].join(" ")}
              onClick={() => handleParentCategoryClick(informationCategory.id)}
            >
              {informationCategory.name}
            </button>
          ))}
        </ul>
      </nav>
    </div>
  );
};
