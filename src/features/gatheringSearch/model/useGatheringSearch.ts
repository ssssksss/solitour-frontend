"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGatheringSearch = () => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || searchParams.get("tagName") || "",
  );
  const [dropdownValue, setDropdownValue] = useState(
    searchParams.get("tagName") != null ? "태그" : "제목",
  );
  const [loading, setLoading] = useState(true);

  const handleSearchClick = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (dropdownValue == "태그") {
      params.set("tagName", searchValue);
      params.delete("page");
      url.search = params.toString();
      window.history.pushState({}, "", url.toString());
    } else {
      // 일반 검색일 경우
      if (searchValue == params.get("search")) return;
      searchValue == ""
        ? params.delete("search")
        : params.set("search", searchValue);
      params.delete("page");
      url.search = params.toString();
      window.history.pushState({}, "", url.toString());
    }
  };

  const dropDownHandler = (value: string) => {
    setDropdownValue(value);
    if (value == dropdownValue) return;
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("page");
    if (value == "제목") {
      params.delete("tagName");
      url.search = params.toString();
      window.history.pushState({}, "", url.toString());
      return;
    }
    params.delete("search");
    // 태그 검색인 경우 글자 수 제한이 15글자이므로 글자를 제거해주는 작업
    let _text = searchValue.trim().slice(0, 15) || "";
    if (_text.length < 2) _text = "";
    setSearchValue(_text);
    params.set("tagName", _text);
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    setSearchValue(params.get("search") || params.get("tagName") || "");
    setDropdownValue(params.get("tagName") != null ? "태그" : "제목");
    setLoading(false);
  }, [searchParams]);

  return {
    loading,
    searchValue,
    dropdownValue,
    setSearchValue,
    dropDownHandler,
    handleSearchClick,
  };
};
