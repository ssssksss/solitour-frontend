"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteDiary } from "@/entities/diary";
import { useToastifyStore } from "@/shared/model";

export const useDiaryViewer = (diaryId: number) => {
  const { setToastifyState } = useToastifyStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteClick = async () => {
    try {
      setLoading(true);
      await deleteDiary(diaryId);
      router.replace("/diary/list?page=1");
    } catch (error) {
      setToastifyState({ type: "error", message: "일기 삭제에 실패했습니다." });
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleDeleteClick };
};
