import { CategoryResponseDto } from "@/types/CategoryDto";
import Link from "next/link";
import React from "react";

interface Props {
  categories: CategoryResponseDto[];
  parentCategoryId: number;
  childCategoryId: number;
}

const ChildCategoryList = ({
  categories,
  parentCategoryId,
  childCategoryId,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <Link
        className={
          `${childCategoryId === 0 ? "border-main bg-main text-white" : "text-gray1"} ` +
          "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105"
        }
        href={`/informations/list?page=1&parentCategoryId=${parentCategoryId}`}
        scroll={false}
      >
        전체
      </Link>
      {categories
        ?.find((parentCategory) => parentCategory.id === parentCategoryId)
        ?.childrenCategories?.map((childCategory, index) => (
          <Link
            key={index}
            className={
              `${childCategory.id === childCategoryId ? "border-main bg-main text-white" : "text-gray1"} ` +
              "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105"
            }
            href={`/informations/list?page=1&parentCategoryId=${parentCategoryId}&childCategoryId=${childCategory.id}`}
            scroll={false}
          >
            {childCategory.name}
          </Link>
        ))}
    </div>
  );
};

export default ChildCategoryList;
