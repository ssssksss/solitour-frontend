"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const useInformationFilterModal = (closeModal: () => void) => {
  const searchParams = useSearchParams();
  const [zoneCategoryId, setZoneCategoryId] = useState(
    Number(searchParams.get("zoneCategoryId") ?? 0),
  );

  const handleClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", "1");

    if (zoneCategoryId !== 0) {
      url.searchParams.set("zoneCategoryId", zoneCategoryId.toString());
    } else {
      url.searchParams.delete("zoneCategoryId");
    }

    window.history.pushState(null, "", url.toString());
    closeModal();
  };

  return { zoneCategoryId, setZoneCategoryId, handleClick };
};
