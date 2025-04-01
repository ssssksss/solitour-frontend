"use client";

import Image from "next/image";
import { useGatheringExcludeToggle } from "../model/useGatheringExcludeToggle";

export const GatheringExcludeToggle = () => {
  const { isExclude, handleToggleClick } = useGatheringExcludeToggle();

  return (
    <button
      className="flex shrink-0 items-center gap-1 text-sm font-medium text-black"
      onClick={() => handleToggleClick()}
    >
      {isExclude ? (
        <Image
          src="/icons/check-active-icon.svg"
          alt="check-active-icon"
          width={20}
          height={20}
        />
      ) : (
        <Image
          src="/icons/check-empty-icon.svg"
          alt="check-empty-icon"
          width={20}
          height={20}
        />
      )}
      <div className="flex w-auto items-center justify-start">모집 중</div>
    </button>
  );
};
