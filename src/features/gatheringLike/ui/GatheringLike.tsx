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
  const { clickable, likeCount, isLike, handleLikeClick } = useGatheringLike(
    gatheringId,
    initialLikeCount,
    initialIsLike,
  );

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
    >
      <HeartIcon className="fill-inherit stroke-inherit" />
      <p>{convertNumberToShortForm(likeCount)}</p>
    </button>
  );

  // return (
  //   <button
  //     onClick={(e) => handleClick(e)}
  //     disabled={loading || userId < 1}
  //     className={`${userId < 1 ? "cursor-default" : "cursor-pointer"} flex flex-row items-center gap-1 text-sm hover:size-110 ${loading ? "text-gray-400" : "text-gray-600"} `}
  //   >
  //     <div className="relative h-4 w-4 text-white">
  //       {isLike ? (
  //         <Image
  //           src="/icons/heart-active-icon.svg"
  //           alt="heart-active-icon"
  //           fill={true}
  //           style={{ objectFit: "contain" }}
  //         />
  //       ) : (
  //         <Image
  //           src="/icons/heart-empty-icon.svg"
  //           alt="heart-empty-icon"
  //           fill={true}
  //           style={{ objectFit: "contain" }}
  //         />
  //       )}
  //     </div>
  //     {convertNumberToShortForm(likeCount)}
  //   </button>
  // );
};
