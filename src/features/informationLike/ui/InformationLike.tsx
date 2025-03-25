"use client";

import { HeartIcon } from "@/shared/ui/icon";
import { useInformationLike } from "../model/useInformationLike";
import { convertNumberToShortForm } from "@/shared/lib/utils";

interface InformationLikeProps {
  informationId: number;
  initialLikeCount: number;
  initialIsLike: boolean;
}

export const InformationLike = ({
  informationId,
  initialLikeCount,
  initialIsLike,
}: InformationLikeProps) => {
  const { loading, clickable, likeCount, isLike, handleLikeClick } =
    useInformationLike(informationId, initialLikeCount, initialIsLike);

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
