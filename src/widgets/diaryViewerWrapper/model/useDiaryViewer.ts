"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteDiary } from "@/entities/diary";

export const useDiaryViewer = (diaryId: number) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteClick = async () => {
    setLoading(true);

    const response = await deleteDiary(diaryId);

    if (!response.ok) {
      alert("일기 삭제에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    router.replace("/diary/list?page=1");
    router.refresh();
  };

  return {
    loading,
    handleDeleteClick,
  };
};
