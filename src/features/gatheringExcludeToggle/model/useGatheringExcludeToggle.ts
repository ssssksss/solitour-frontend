"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGatheringExcludeToggle = () => {
  const searchParams = useSearchParams();
  const [isExclude, setIsExclude] = useState(true);

  const handleToggleClick = () => {
    setIsExclude((prev) => !prev);
    const url = new URL(window.location.href);

    url.searchParams.delete("isExclude");
    if (isExclude) {
      url.searchParams.set("isExclude", "false");
    }
    url.searchParams.set("page", "1");

    window.history.pushState(null, "", url.toString());
  };

  useEffect(() => {
    setIsExclude(searchParams.get("isExclude") ? false : true);
  }, [searchParams]);

  return { isExclude, handleToggleClick };
};
