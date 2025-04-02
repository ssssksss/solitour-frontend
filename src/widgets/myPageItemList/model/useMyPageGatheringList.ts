"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks";
import { Gathering, getMyPageGatheringList } from "@/entities/gathering";
import { useToastifyStore } from "@/shared/model";

export const useMyPageGatheringList = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const currentPage = Number(searchParams.get("page") ?? 1);
  const [elements, setElements] = useState<Gathering[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const userStore = useUserStore();
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const { setToastifyState } = useToastifyStore();

  const handleCategoryClick = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete("page");
    url.searchParams.set("category", value);
    window.history.pushState(null, "", url.toString());
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
    (async () => {
      try {
        setLoading(true);
        const myPageGatheringList = await getMyPageGatheringList(
          category,
          currentPage,
        );

        setElements(myPageGatheringList.content);
        setTotalElements(myPageGatheringList.page.totalElements);
      } catch (error) {
        setToastifyState({
          type: "error",
          message: "모임 목록 조회에 실패했습니다.",
        });
        setElements([]);
        setTotalElements(0);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return {
    category,
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
