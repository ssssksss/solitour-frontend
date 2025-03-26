"use client";

import { Gathering, getGatheringList } from "@/entities/gathering";
import { useUserStore } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGatheringList = () => {
  const searchParams = useSearchParams();
  const [totalElements, setTotalElements] = useState(1);
  const [elements, setElements] = useState<Gathering[]>([]);
  const [loading, setLoading] = useState(true);
  const userStore = useUserStore();
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  );

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
    (async () => {
      const url = new URL(window.location.href);
      const page = Number(searchParams.get("page"));

      if (page < 1 || !Number.isSafeInteger(page)) {
        return;
      }

      url.searchParams.set("page", (page - 1).toString());

      setLoading(true);
      const gatheringList = await getGatheringList(url.search);

      setElements(gatheringList.content);
      setTotalElements(gatheringList.page.totalElements);
      setCurrentPage(page);
      setLoading(false);
    })();
  }, [searchParams]);

  return {
    loading,
    totalElements,
    elements,
    isOpen,
    currentPage,
    userStore,
    closeModal,
    checkAccessGathering,
  };
};
