"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteInformation } from "@/entities/information";
import { useToastifyStore } from "@/shared/model";

export const useInformationViewerButtonList = (informationId: number) => {
  const [loading, setLoading] = useState(false);
  const { setToastifyState } = useToastifyStore();
  const router = useRouter();

  const handleDeleteClick = async () => {
    try {
      setLoading(true);
      await deleteInformation(informationId);
      router.replace("/informations/list?page=1&parentCategoryId=1");
    } catch (error) {
      setToastifyState({ type: "error", message: "정보 삭제에 실패했습니다." });
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleDeleteClick };
};
