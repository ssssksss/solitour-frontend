"use client";

import { convertNumberToShortForm } from "@/shared/lib/utils/convertNumberToShortForm";
import { fetchWithAuth } from "@/shared/api";
import Image from "next/image";
import { useState } from "react";
import { useUserStore } from "@/entities/user";

interface GatheringLikeProps {
  initialLikes: number;
  initialIsLike: boolean;
  gatheringId: number;
}

const GatheringLike = ({
  initialLikes,
  initialIsLike,
  gatheringId,
}: GatheringLikeProps) => {
  const { id: userId } = useUserStore();
  const [isLike, setIsLike] = useState(initialIsLike); // 상태
  const [likes, setLikes] = useState(initialLikes); // 숫자
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
        `/api/gathering/like?id=${gatheringId}`,
        { method: isLike ? "DELETE" : "POST" },
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
    <button
      onClick={(e) => handleClick(e)}
      disabled={loading || userId < 1}
      className={`${userId < 1 ? "cursor-default" : "cursor-pointer"} flex flex-row items-center gap-1 text-sm hover:size-110 ${loading ? "text-gray-400" : "text-gray-600"} `}
    >
      <div className="relative h-4 w-4 text-white">
        {isLike ? (
          <Image
            src="/icons/heart-active-icon.svg"
            alt="heart-active-icon"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <Image
            src="/icons/heart-empty-icon.svg"
            alt="heart-empty-icon"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        )}
      </div>
      {convertNumberToShortForm(likes)}
    </button>
  );
};

export default GatheringLike;
