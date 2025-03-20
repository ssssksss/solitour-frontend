"use client";

import { fetchWithAuth } from "@/shared/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Information {
  informationId: number;
  title: string;
  zoneCategoryParentName: string;
  zoneCategoryChildName: string;
  viewCount: number;
  isBookMark: boolean;
  thumbNailImage: string;
  likeCount: number;
}

// value 변경하지 말것 api주소와 연결되어있음
const categories = [
  {
    name: "내 게시물",
    value: "owner",
  },
  {
    name: "북마크",
    value: "bookmark",
  },
];

export const useMyPageInformationList = () => {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [elements, setElements] = useState<Information[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryClick = (value: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("page");
    params.set("category", value);
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
    setActiveCategory(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setIsLoading(true);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const category = params.get("category") || "";
    setActiveCategory(category);

    if (searchParams.get("category") != category) {
      setIsLoading(false);
      return;
    }

    (async () => {
      const res = await fetchWithAuth(
        `/api/mypage/information?category=${category}&page=${currentPage - 1}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        },
      );
      const data = await res.json();
      setElements(data.content);
      setTotalElements(data.page.totalElements);
      setIsLoading(false);
    })();
  }, [searchParams, currentPage]);

  return {
    categories,
    activeCategory,
    currentPage,
    elements,
    totalElements,
    isLoading,
    handleCategoryClick,
  };
};
