"use client";

import Image from "next/image";
import { useInformationBookmark } from "../model/useInformationBookmark";
import { useUserStore } from "@/entities/user";

interface InformationBookmarkProps {
  informationId: number;
  initialIsBookmarked: boolean;
}

export const InformationBookmark = ({
  informationId,
  initialIsBookmarked,
}: InformationBookmarkProps) => {
  const { id: userId } = useUserStore();
  const { loading, isBookmarked, handleBookmarkClick } = useInformationBookmark(
    informationId,
    initialIsBookmarked,
  );

  if (userId <= 0) {
    return null;
  }

  return (
    <button
      className="relative h-7 w-5 text-white hover:scale-110"
      type="button"
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
