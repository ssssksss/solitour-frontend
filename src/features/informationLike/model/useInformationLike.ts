"use client";

import { useUserStore } from "@/entities/user";
import { useEffect, useState } from "react";
import useInformationLikeStore from "./informationLikeStore";
import {
  createInformationLike,
  deleteInformationLike,
} from "../api/informationLike";
import { useToastifyStore } from "@/shared/model";

export const useInformationLike = (
  informationId: number,
  likeCount: number,
  isLike: boolean,
) => {
  const { id: userId } = useUserStore();
  const { setToastifyState } = useToastifyStore();
  const informationLikeStore = useInformationLikeStore();
  const [loading, setLoading] = useState(false);

  const handleLikeClick = async () => {
    setLoading(true);
    const beforeLikeCount = informationLikeStore.likeCount;
    const beforeIsLike = informationLikeStore.isLike;

    try {
      if (informationLikeStore.isLike) {
        informationLikeStore.setInformationLikeState({
          likeCount: informationLikeStore.likeCount - 1,
          isLike: false,
        });
        await deleteInformationLike(informationId);
      } else {
        informationLikeStore.setInformationLikeState({
          likeCount: informationLikeStore.likeCount + 1,
          isLike: true,
        });
        await createInformationLike(informationId);
      }
    } catch (error) {
      informationLikeStore.setInformationLikeState({
        likeCount: beforeLikeCount,
        isLike: beforeIsLike,
      });
      setToastifyState({
        type: "error",
        message: "좋아요 업데이트에 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    informationLikeStore.setInformationLikeState({
      likeCount: likeCount,
      isLike: isLike,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    clickable: userId > 0,
    likeCount: informationLikeStore.likeCount,
    isLike: informationLikeStore.isLike,
    handleLikeClick,
  };
};
