"use client";

import { convertNumberToShortForm } from "@/shared/lib/utils";
import { HeartIcon } from "@/shared/ui/icon";
import { useGatheringLike } from "../model/useGatheringLike";

interface GatheringLikeProps {
  gatheringId: number;
  initialLikeCount: number;
  initialIsLike: boolean;
}

export const GatheringLike = ({
  gatheringId,
  initialLikeCount,
  initialIsLike,
}: GatheringLikeProps) => {
  const { loading, clickable, likeCount, isLike, handleLikeClick } =
    useGatheringLike(gatheringId, initialLikeCount, initialIsLike);

  if (!clickable) {
    return (
      <div className="stroke-gray2 text-gray2 flex flex-row items-center gap-1 text-xs">
        <HeartIcon className="stroke-inherit" />
        <p>{convertNumberToShortForm(likeCount)}</p>
      </div>
    );
  }

  return (
    <button
      className={[
        isLike
          ? "fill-[#F85E5E] stroke-[#F85E5E] text-[#F85E5E]"
          : "stroke-gray2 text-gray2 fill-none hover:fill-[#F85E5E] hover:stroke-[#F85E5E]",
        "flex flex-row items-center gap-1.25 text-xs hover:text-[#F85E5E]",
      ].join(" ")}
      type="button"
      onClick={handleLikeClick}
      disabled={loading}
    >
      <HeartIcon className="fill-inherit stroke-inherit" />
      <p>{convertNumberToShortForm(likeCount)}</p>
    </button>
  );
};
