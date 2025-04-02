"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const useNoticeSearch = () => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get("search") || searchParams.get("tagName") || "",
  );

  const handleSearchClick = () => {
    const url = new URL(window.location.href);

    if (searchValue == url.searchParams.get("search")) {
      return;
    }

    if (searchValue === "") {
      url.searchParams.delete("search");
    } else {
      url.searchParams.set("search", searchValue);
    }

    url.searchParams.delete("page");

    window.history.pushState(null, "", url.toString());
  };

  return { searchValue, setSearchValue, handleSearchClick };
};
