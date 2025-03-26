"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const useInformationFilterModal = (closeModal: () => void) => {
  const searchParams = useSearchParams();
  const [place, setPlace] = useState<string | null>(searchParams.get("place"));

  const handleClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", "1");

    if (place) {
      url.searchParams.set("place", place);
    } else {
      url.searchParams.delete("place");
    }

    window.history.pushState(null, "", url.toString());
    closeModal();
  };

  return { place, setPlace, handleClick };
};
