"use client";

import { useUserStore } from "@/entities/user";
import { useState } from "react";
import { createGatheringLike, deleteGatheringLike } from "../api/gatheringLike";

export const useGatheringLike = (
  gatheringId: number,
  initialLikeCount: number,
  initialIsLike: boolean,
) => {
  const { id: userId } = useUserStore();
  const [isLike, setIsLike] = useState(initialIsLike);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  const handleLikeClick = async () => {
    setLoading(true);
    const beforeLikeCount = likeCount;
    const beforeIsLike = isLike;

    try {
      if (isLike) {
        setLikeCount(likeCount - 1);
        setIsLike(false);
        await deleteGatheringLike(gatheringId);
      } else {
        setLikeCount(likeCount + 1);
        setIsLike(true);
        await createGatheringLike(gatheringId);
      }
    } catch (error) {
      setLikeCount(beforeLikeCount);
      setIsLike(beforeIsLike);
    } finally {
      setLoading(false);
    }
  };

  return { loading, clickable: userId > 0, likeCount, isLike, handleLikeClick };
};
