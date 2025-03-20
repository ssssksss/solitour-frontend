"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const useInformationFilterModal = (closeModal: () => void) => {
  const searchParams = useSearchParams();
  const [place, setPlace] = useState<string | null>(searchParams.get("place"));
  const router = useRouter();

  const handleClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", "1");

    if (place) {
      url.searchParams.set("place", place);
    } else {
      url.searchParams.delete("place");
    }

    router.push(url.href, { scroll: false });
    closeModal();
  };

  return { place, setPlace, handleClick };
};
