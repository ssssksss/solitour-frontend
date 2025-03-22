"use client";

import { useUserStore } from "@/entities/user";
import { fetchWithAuth } from "@/shared/api";
import { useState } from "react";

export const useGatheringLike = (
  gatheringId: number,
  initialLikeCount: number,
  initialIsLike: boolean,
) => {
  const { id: userId } = useUserStore();
  const [isLike, setIsLike] = useState(initialIsLike); // 상태
  const [likeCount, setLikeCount] = useState(initialLikeCount); // 숫자
  const [loading, setLoading] = useState(false);

  const handleLikeClick = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const newIsLike = !isLike;
    const newLikes = newIsLike ? likeCount + 1 : likeCount - 1;

    setIsLike(newIsLike);
    setLikeCount(newLikes);

    try {
      const response = await fetchWithAuth(
        `/api/gathering/like?id=${gatheringId}`,
        { method: isLike ? "DELETE" : "POST" },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setIsLike(isLike);
      setLikeCount(likeCount);
    } finally {
      setLoading(false);
    }
  };

  return { clickable: userId > 0, likeCount, isLike, handleLikeClick };
};
