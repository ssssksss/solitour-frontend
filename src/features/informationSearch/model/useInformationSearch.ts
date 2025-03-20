"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useModalBackHandler, usePreventBodyScroll } from "@/shared/lib/hooks";

export const useInformationSearch = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderDropdownVisible, setOrderDropdownVisible] = useState(false);
  const searchParams = useSearchParams();
  const place = searchParams.get("place") ?? "";
  const order = searchParams.get("order") ?? "latest";
  const [searchValue, setSearchValue] = useState("");
  const [searchMethod, setSearchMethod] = useState<"제목" | "태그">("제목");
  const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
  const router = useRouter();

  const handleSearchMethodChange = (value: "제목" | "태그") => {
    setSearchValue("");
    setSearchMethod(value);
  };

  const handleSearchValueChange = (value: string) => {
    if (searchMethod === "제목") {
      setSearchValue(value.slice(0, 50));
    } else {
      setSearchValue(value.trim().slice(0, 15));
    }
  };

  const handleSearchClick = () => {
    if (searchMethod === "태그" && searchValue.length === 1) {
      alert("2 ~ 15자의 태그를 입력해 주세요.");
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("page", "1");
    url.searchParams.delete("search");
    url.searchParams.delete("tagName");

    if (searchValue !== "") {
      url.searchParams.set(
        searchMethod === "제목" ? "search" : "tagName",
        searchValue,
      );
    }

    router.push(url.href, { scroll: false });
  };

  const handleOrderClick = (order: "latest" | "likes" | "views") => {
    const url = new URL(window.location.href);
    url.searchParams.set("order", order);
    router.push(url.href, { scroll: false });
  };

  usePreventBodyScroll(modalVisible);
  useModalBackHandler(modalVisible, () => setModalVisible(false));

  return {
    place,
    order,
    searchMethod,
    searchValue,
    modalVisible,
    orderDropdownVisible,
    searchDropdownVisible,
    openModal: () => setModalVisible(true),
    closeModal: () => setModalVisible(false),
    setOrderDropdownVisible,
    setSearchDropdownVisible,
    handleSearchMethodChange,
    handleSearchValueChange,
    handleSearchClick,
    handleOrderClick,
  };
};
