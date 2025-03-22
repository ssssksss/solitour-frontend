"use client";

import Image from "next/image";
import { useUserStore } from "@/entities/user";
import { fetchWithAuth } from "@/shared/api";
import { useState } from "react";

interface GatheringBookMarkProps {
  initialIsBookmarked: boolean;
  postId: number;
}

const GatheringBookmark = ({
  initialIsBookmarked,
  postId,
}: GatheringBookMarkProps) => {
  const { id: userId } = useUserStore();
  const [isBookMark, setIsBookMark] = useState(initialIsBookmarked);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    if (loading) return;
    e.preventDefault();
    setLoading(true);

    const newIsLike = !isBookMark;
    setIsBookMark(newIsLike);

    try {
      const response = await fetchWithAuth(
        `/api/bookmark/gathering?gatheringId=${postId}`,
        {
          method: isBookMark ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setIsBookMark(isBookMark);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`${userId < 1 && "cursor-default"} relative h-7 w-5 hover:scale-105`}
      onClick={(e) => userId > 0 && handleClick(e)}
      disabled={loading}
    >
      <Image
        className="object-contain"
        src={`/icons/bookmark-${isBookMark ? "active-" : ""}icon.svg`}
        alt="bookmark-icon"
        fill={true}
      />
    </button>
  );
};

export default GatheringBookmark;
