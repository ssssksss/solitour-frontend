"use client";

import { useState } from "react";
import {
  createInformationBookmark,
  deleteInformationBookmark,
} from "../api/informationBookmark";
import { useToastifyStore } from "@/shared/model";

export const useInformationBookmark = (
  informationId: number,
  initialIsBookmarked: boolean,
) => {
  const { setToastifyState } = useToastifyStore();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [loading, setLoading] = useState(false);

  const handleBookmarkClick = async () => {
    setLoading(true);
    const beforeIsBookmarked = isBookmarked;

    try {
      if (isBookmarked) {
        setIsBookmarked(false);
        await deleteInformationBookmark(informationId);
      } else {
        setIsBookmarked(true);
        await createInformationBookmark(informationId);
      }
    } catch (error) {
      setIsBookmarked(beforeIsBookmarked);
      setToastifyState({
        type: "error",
        message: "북마크 업데이트에 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, isBookmarked, handleBookmarkClick };
};
