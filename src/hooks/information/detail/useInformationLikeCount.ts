"use client";

import useAuthStore from "@/stores/authStore";
import useInformationLikeStore from "@/stores/informationLikeStore";
import { fetchWithAuth } from "@/shared/api/fetchWithAuth";
import { useEffect, useState } from "react";

export const useInformationLikeCount = (
  informationId: number,
  likeCount: number,
  isLike: boolean,
) => {
  const userId = useAuthStore().id;
  const informationLikeStore = useInformationLikeStore();
  const [loading, setLoading] = useState(false);

  const handleLikeClick = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const data = new URLSearchParams();
    data.append("infoId", informationId.toString());

    if (informationLikeStore.isLiked) {
      informationLikeStore.setInformationLike({
        likeCount: informationLikeStore.likeCount - 1,
        isLiked: false,
      });

      const response = await fetchWithAuth("/api/informations/great", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        informationLikeStore.setInformationLike({
          likeCount: informationLikeStore.likeCount + 1,
          isLiked: true,
        });
        setLoading(false);
        alert("좋아요 취소에 실패하였습니다.");
        throw new Error(response.statusText);
      }
    } else {
      informationLikeStore.setInformationLike({
        likeCount: informationLikeStore.likeCount + 1,
        isLiked: true,
      });

      const response = await fetchWithAuth("/api/informations/great", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        informationLikeStore.setInformationLike({
          likeCount: informationLikeStore.likeCount - 1,
          isLiked: false,
        });
        setLoading(false);
        alert("좋아요 등록에 실패하였습니다.");
        throw new Error(response.statusText);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    informationLikeStore.setInformationLike({
      likeCount: likeCount,
      isLiked: isLike,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    clickable: userId > 0,
    likeCount: informationLikeStore.likeCount,
    isLike: informationLikeStore.isLiked,
    handleLikeClick,
  };
};
