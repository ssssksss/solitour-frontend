"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGatheringSearch = () => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || searchParams.get("tagName") || "",
  );
  const [dropdownValue, setDropdownValue] = useState<"제목" | "태그">(
    searchParams.get("tagName") !== null ? "태그" : "제목",
  );

  const dropdownHandler = (value: "제목" | "태그") => {
    setSearchValue("");
    setDropdownValue(value);
  };

  const handleSearchClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("page");
    url.searchParams.delete("search");
    url.searchParams.delete("tagName");

    if (searchValue !== "") {
      url.searchParams.set(
        dropdownValue === "제목" ? "search" : "tagName",
        searchValue,
      );
    }

    window.history.pushState(null, "", url.toString());
  };

  useEffect(() => {
    setSearchValue(
      searchParams.get("search") || searchParams.get("tagName") || "",
    );
    setDropdownValue(searchParams.get("tagName") === "제목" ? "제목" : "태그");
  }, [searchParams]);

  return {
    searchValue,
    dropdownValue,
    setSearchValue,
    dropdownHandler,
    handleSearchClick,
  };
};
