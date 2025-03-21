"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks";
import { Gathering, getMyPageGatheringList } from "@/entities/gathering";

export const useMyPageGatheringList = () => {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );
  const [elements, setElements] = useState<Gathering[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const userStore = useUserStore();
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();

  const handleCategoryClick = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete("page");
    url.searchParams.set("category", value);
    window.history.pushState(null, "", url.toString());
    setActiveCategory(value);
    setCurrentPage(1);
  };

  const checkAccessGathering = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (userStore.id > 0 && (!userStore.sex || !userStore.age)) {
      e.preventDefault();
      openModal();
    }

    if (userStore.id < 1) {
      e.preventDefault();
      router.push("/auth/signin");
    }
  };

  useEffect(() => {
    const category = searchParams.get("category");

    if (!category) {
      return;
    }

    setLoading(true);
    setActiveCategory(category);

    (async () => {
      const myPageGatheringList = await getMyPageGatheringList(
        category,
        currentPage,
      );

      setElements(myPageGatheringList.content);
      setTotalElements(myPageGatheringList.page.totalElements);
      setLoading(false);
    })();
  }, [searchParams, currentPage]);

  return {
    activeCategory,
    currentPage,
    elements,
    totalElements,
    loading,
    isOpen,
    isAccessible: !!userStore.sex && !!userStore.age && userStore.id > 0,
    handleCategoryClick,
    checkAccessGathering,
    closeModal,
  };
};
