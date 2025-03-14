"use client";

import useAuthStore from "@/stores/authStore";
import { fetchWithAuth } from "@/shared/api/fetchWithAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import usePreventBodyScroll from "@/shared/lib/hooks/usePreventBodyScroll";
import { useModalBackHandler } from "@/shared/lib/hooks";

export const useButtonList = (informationId: number) => {
  const { id } = useAuthStore();
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
