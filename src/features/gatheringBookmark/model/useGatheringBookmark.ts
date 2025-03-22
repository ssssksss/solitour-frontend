"use client";

import { useUserStore } from "@/entities/user";
import { useState } from "react";
import { createBookmark, deleteBookmark } from "../api/bookmark";

export const useGatheringBookmark = (
  gatheringId: number,
  initialIsBookmarked: boolean,
) => {
  const { id: userId } = useUserStore();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [loading, setLoading] = useState(false);

  const handleBookmarkClick = async () => {
    setLoading(true);
    const beforeIsBookmarked = isBookmarked;

    try {
      if (isBookmarked) {
        setIsBookmarked(false);
        await deleteBookmark(gatheringId);
      } else {
        setIsBookmarked(true);
        await createBookmark(gatheringId);
      }
    } catch (error) {
      setIsBookmarked(beforeIsBookmarked);
    } finally {
      setLoading(false);
    }
  };

  return { userId, loading, isBookmarked, handleBookmarkClick };
};
