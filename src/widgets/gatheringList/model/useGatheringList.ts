"use client";

import {
  Gathering,
  getGatheringList,
  getGatheringListByTagName,
} from "@/entities/gathering";
import { useUserStore } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks";
import { useToastifyStore } from "@/shared/model";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGatheringList = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);
  const [totalElements, setTotalElements] = useState(0);
  const [elements, setElements] = useState<Gathering[]>([]);
  const [loading, setLoading] = useState(true);
  const userStore = useUserStore();
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const { setToastifyState } = useToastifyStore();

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

        if (currentPage < 1 || !Number.isSafeInteger(currentPage)) {
          setElements([]);
          setTotalElements(0);
          return;
        }

        const url = new URL(window.location.href);
        url.searchParams.set("page", (currentPage - 1).toString());

        if (searchParams.get("tagName")) {
          const gatheringList = await getGatheringListByTagName(url.search);
          setElements(gatheringList.content);
          setTotalElements(gatheringList.page.totalElements);
        } else {
          const gatheringList = await getGatheringList(url.search);
          setElements(gatheringList.content);
          setTotalElements(gatheringList.page.totalElements);
        }
      } catch (error) {
        setToastifyState({
          type: "error",
          message: "모임 목록 조회에 실패했습니다.",
        });
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
