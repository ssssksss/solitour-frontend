import { CategoryResponseDto } from "@/types/CategoryDto";
import Link from "next/link";
import React from "react";

interface Props {
  categories: CategoryResponseDto[];
  categoryId: number;
}

const ChildCategoryList = ({ categories, categoryId }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {categories
        ?.find((parentCategory) => parentCategory.id === categoryId)
        ?.childrenCategories?.map((childCategory, index) => (
          <Link
            key={index}
            className={
              `${childCategory.id === categoryId ? "border-main bg-main text-white" : "text-gray1 dark:border-slate-400 dark:bg-slate-600 dark:text-slate-400"} ` +
              "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105"
            }
            href={`/informations/child-category/${childCategory.id}?page=1`}
          >
            {childCategory.name}
          </Link>
        ))}
    </div>
  );
};

export default ChildCategoryList;
