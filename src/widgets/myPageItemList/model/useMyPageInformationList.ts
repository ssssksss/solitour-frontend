"use client";

import { getMyPageInformationList, Information } from "@/entities/information";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useMyPageInformationList = () => {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );
  const [elements, setElements] = useState<Information[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete("page");
    url.searchParams.set("category", value);
    window.history.pushState(null, "", url.toString());
    setActiveCategory(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const category = searchParams.get("category");

    if (!category) {
      return;
    }

    setLoading(true);
    setActiveCategory(category);

    (async () => {
      const myPageInformationList = await getMyPageInformationList(
        category,
        currentPage,
      );

      setElements(myPageInformationList.content);
      setTotalElements(myPageInformationList.page.totalElements);
      setLoading(false);
    })();
  }, [searchParams, currentPage]);

  return {
    activeCategory,
    currentPage,
    elements,
    totalElements,
    loading,
    handleCategoryClick,
  };
};
