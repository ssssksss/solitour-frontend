"use client";

import InformationLikeCount from "@/components/informations/detail/InformationLikeCount";
import useAuthStore from "@/stores/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useState } from "react";

interface Props {
  informationId: number;
  likeCount: number;
  isLike: boolean;
}

const InformationLikeCountContainer = ({
  informationId,
  likeCount,
  isLike,
}: Props) => {
  const userId = useAuthStore().id;
  const [isLiked, setIsLiked] = useState(isLike);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [loading, setLoading] = useState(false);

  const onLikesClick = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const data = new URLSearchParams();
    data.append("infoId", informationId.toString());

    if (isLiked) {
      setCurrentLikeCount(currentLikeCount - 1);
      setIsLiked(false);

      const response = await fetchWithAuth("/api/informations/great", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        setCurrentLikeCount(currentLikeCount + 1);
        setIsLiked(true);
        setLoading(false);
        alert("좋아요 취소에 실패하였습니다.");
        throw new Error(response.statusText);
      }
    } else {
      setCurrentLikeCount(currentLikeCount + 1);
      setIsLiked(true);

      const response = await fetchWithAuth("/api/informations/great", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        setCurrentLikeCount(currentLikeCount - 1);
        setIsLiked(false);
        setLoading(false);
        alert("좋아요 등록에 실패하였습니다.");
        throw new Error(response.statusText);
      }
    }

    setLoading(false);
  };

  return (
    <InformationLikeCount
      clickable={userId > 0}
      initialLikeCount={currentLikeCount}
      isLiked={isLiked}
      onLikesClick={onLikesClick}
    />
  );
};

export default InformationLikeCountContainer;
