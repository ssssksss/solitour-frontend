"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Gathering } from "@/entities/gathering/model/GatheringDto";
import { useModalState } from "@/shared/lib/hooks";
import { useUserStore } from "@/entities/user";
import { fetchWithAuth } from "@/shared/api";

// value 변경하지 말것 api주소와 연결되어있음
const categories = [
  {
    name: "내가 만든 모임",
    value: "host",
  },
  {
    name: "내가 신청한 모임",
    value: "applicant",
  },
  {
    name: "북마크",
    value: "bookmark",
  },
];

export const useMyPageGatheringList = () => {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );
  const router = useRouter();
  const modalState = useModalState();
  const [elements, setElements] = useState<Gathering[]>([]);
  const userStore = useUserStore();
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const pageHandler = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page + "");
    url.search = params.toString();
    setCurrentPage(page);
    window.history.pushState({}, "", url.toString());
  };

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

  const checkAccessGathering = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (userStore.id > 0 && (!userStore.sex || !userStore.age)) {
      e.preventDefault();
      modalState.openModal();
    }
    if (userStore.id < 1) {
      e.preventDefault();
      router.push("/auth/signin");
    }
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
        `/api/mypage/gathering?category=${category}&page=${currentPage - 1}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        },
      );

      if (!res.ok) {
        setElements([]);
        setTotalElements(0);
        setIsLoading(false);
        return;
      }

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
    modalState,
    isAccessible: !!userStore.sex && !!userStore.age && userStore.id > 0,
    pageHandler,
    handleCategoryClick,
    checkAccessGathering,
  };
};
