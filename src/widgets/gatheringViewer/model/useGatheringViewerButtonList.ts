"use client";

import { deleteGathering } from "@/entities/gathering";
import { useToastifyStore } from "@/shared/model";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useGatheringViewerButtonList = (gatheringId: number) => {
  const { setToastifyState } = useToastifyStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteClick = async () => {
    try {
      setLoading(true);
      await deleteGathering(gatheringId);
      router.replace("/gathering");
    } catch (error) {
      setToastifyState({
        type: "error",
        message: "모임 삭제에 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleDeleteClick };
};
