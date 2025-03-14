"use client";

import { InformationCategory } from "@/entities/information/model/informationCategoryDto";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

interface ChildCategoryListProps {
  categories: InformationCategory[];
  parentCategoryId: number;
  childCategoryId: number;
}

const ChildCategoryList = ({
  categories,
  parentCategoryId,
  childCategoryId,
}: ChildCategoryListProps) => {
  const searchParams = useSearchParams();
  const place = searchParams.get("place");
  const order = searchParams.get("order");
  const tagName = searchParams.get("tagName");
  const search = searchParams.get("search");

  return (
    <div className="flex flex-wrap items-center gap-1">
      <Link
        className={
          `${childCategoryId === 0 ? "border-main bg-main text-white" : "text-gray1"} ` +
          "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105"
        }
        href={[
          "/informations/list?page=1&parentCategoryId=",
          `${parentCategoryId}${place !== null ? `&place=${place}` : ""}`,
          `${order !== null ? `&order=${order}` : ""}`,
          `${tagName !== null ? `&tagName=${tagName}` : ""}${search !== null ? `&search=${search}` : ""}`,
        ].join("")}
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
            href={`/informations/list?page=1&parentCategoryId=${parentCategoryId}&childCategoryId=${childCategory.id}${place !== null ? `&place=${place}` : ""}${order !== null ? `&order=${order}` : ""}${tagName !== null ? `&tagName=${tagName}` : ""}${search !== null ? `&search=${search}` : ""}`}
            scroll={false}
          >
            {childCategory.name}
          </Link>
        ))}
    </div>
  );
};

export default ChildCategoryList;
