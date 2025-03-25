"use client";

import Image from "next/image";
import { useGatheringBookmark } from "../model/useGatheringBookmark";
import { useUserStore } from "@/entities/user";

interface GatheringBookmarkProps {
  gatheringId: number;
  initialIsBookmarked: boolean;
}

export const GatheringBookmark = ({
  gatheringId,
  initialIsBookmarked,
}: GatheringBookmarkProps) => {
  const { id: userId } = useUserStore();
  const { loading, isBookmarked, handleBookmarkClick } = useGatheringBookmark(
    gatheringId,
    initialIsBookmarked,
  );

  if (userId <= 0) {
    return null;
  }

  return (
    <button
      className="relative h-7 w-5 cursor-pointer hover:scale-105"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleBookmarkClick();
      }}
      disabled={loading}
    >
      <Image
        className="object-contain"
        src={`/icons/bookmark-${isBookmarked ? "active-" : ""}icon.svg`}
        alt="bookmark-icon"
        fill={true}
      />
    </button>
  );
};
