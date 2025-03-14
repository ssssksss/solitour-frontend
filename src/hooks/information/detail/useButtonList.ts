"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useModalBackHandler, usePreventBodyScroll } from "@/shared/lib/hooks";
import { useUserStore } from "@/entities/user";
import { fetchWithAuth } from "@/shared/api";

export const useButtonList = (informationId: number) => {
  const { id } = useUserStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteClick = async () => {
    setLoading(true);

    const response = await fetchWithAuth(`/api/informations/${informationId}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      alert("정보 삭제에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    router.replace("/informations/list?page=1&parentCategoryId=1");
    router.refresh();
  };

  usePreventBodyScroll(modalVisible);
  useModalBackHandler(modalVisible, () => setModalVisible(false));

  return { id, modalVisible, loading, setModalVisible, handleDeleteClick };
};
