"use client";

import Image from "next/image";
import { useInformationBookmark } from "../model/useInformationBookmark";

interface InformationBookmarkProps {
  informationId: number;
  initialIsBookmarked: boolean;
}

export const InformationBookmark = ({
  informationId,
  initialIsBookmarked,
}: InformationBookmarkProps) => {
  const { userId, isBookmarked, handleBookmarkClick } = useInformationBookmark(
    informationId,
    initialIsBookmarked,
  );

  if (userId <= 0) {
    return null;
  }

  return (
    <button
      className="relative h-7 w-5 cursor-pointer text-white hover:scale-110"
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleBookmarkClick();
      }}
    >
      <Image
        src={`/icons/bookmark-${isBookmarked ? "active-" : ""}icon.svg`}
        alt="bookmark-icon"
        fill={true}
        style={{ objectFit: "contain" }}
      />
    </button>
  );
};
