"use client";

import { useToastifyStore } from "@/shared/model";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { closeGathering } from "../api/gatheringStatus";

export const useGatheringStatusChangeModal = (
  isFinish: boolean,
  closeModal: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { setToastifyState } = useToastifyStore();

  const handleRemoveClick = async () => {
    try {
      setLoading(true);

      // 모임 제거
      await closeGathering(isFinish, Number(params.id));
      router.replace("/gathering");
    } catch (error) {
      setToastifyState({
        type: "error",
        message: "모임 마감에 실패했습니다.",
      });
    } finally {
      closeModal();
      setLoading(false);
    }
  };

  return { loading, handleRemoveClick };
};
