"use client";

import { useUserStore } from "@/entities/user";
import { useState } from "react";
import { createBookmark, deleteBookmark } from "../api/bookmark";

export const useInformationBookmark = (
  informationId: number,
  initialIsBookmarked: boolean,
) => {
  const userId = useUserStore().id;
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [loading, setLoading] = useState(false);

  const handleBookmarkClick = async () => {
    setLoading(true);
    const beforeIsBookmarked = isBookmarked;

    try {
      if (isBookmarked) {
        setIsBookmarked(false);
        await deleteBookmark(informationId);
      } else {
        setIsBookmarked(true);
        await createBookmark(informationId);
      }
    } catch (error) {
      setIsBookmarked(beforeIsBookmarked);
    } finally {
      setLoading(false);
    }
  };

  return { userId, loading, isBookmarked, handleBookmarkClick };
};
