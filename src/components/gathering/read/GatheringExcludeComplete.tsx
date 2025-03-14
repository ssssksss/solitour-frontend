"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GatheringExcludeComplete = () => {
  const [isExclude, setIsExclude] = useState(true);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const checkExcludeCompleteGatheringHandler = () => {
    setIsExclude((prev) => !prev);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("isExclude");
    if (isExclude) {
      params.set("isExclude", "false");
    }
    params.set("page", "1");
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    setIsExclude(searchParams.get("isExclude") ? false : true);
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="relative flex h-[2rem] w-[4rem] shrink-0 animate-pulse items-center rounded-xl bg-gray-300 text-left"></div>
    );
  }

  return (
    <button
      className="flex shrink-0 items-center gap-1 text-sm font-medium text-black"
      onClick={checkExcludeCompleteGatheringHandler}
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

export default GatheringExcludeComplete;
