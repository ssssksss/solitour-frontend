"use client";
import GatheringLike from "@/components/gathering/read/GatheringLike";
import useAuthStore from "@/stores/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useState } from "react";

interface IGatheringLikeContainer {
  likes: number;
  isLike: boolean;
  gatheringId: number;
}

const GatheringLikeContainer = (props: IGatheringLikeContainer) => {
  const { id: userId } = useAuthStore();
  const [isLike, setIsLike] = useState(props.isLike); // 상태
  const [likes, setLikes] = useState(props.likes); // 숫자
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    if (loading) return;
    e.preventDefault();
    setLoading(true);

    const newIsLike = !isLike;
    const newLikes = newIsLike ? likes + 1 : likes - 1;

    setIsLike(newIsLike);
    setLikes(newLikes);

    try {
      const response = await fetchWithAuth(
        `/api/gathering/like?id=${props.gatheringId}`,
        {
          method: isLike ? "DELETE" : "POST",
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setIsLike(isLike);
      setLikes(likes);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GatheringLike
      loading={loading}
      userId={userId}
      handleClick={handleClick}
      likes={likes}
      isLike={isLike}
      gatheringId={props.gatheringId}
    />
  );
};

export default GatheringLikeContainer;
