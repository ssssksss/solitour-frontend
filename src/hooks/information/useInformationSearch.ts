"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import usePreventBodyScroll from "../usePreventBodyScroll";
import useModalBackHandler from "../useModalBackHandler";

export const useInformationSearch = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderDropdownVisible, setOrderDropdownVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const parentCategoryId = searchParams.get("parentCategoryId")!;
  const childCategoryId = searchParams.get("childCategoryId");
  const place = searchParams.get("place") ?? "";
  const order = searchParams.get("order") ?? "latest";
  const [searchValue, setSearchValue] = useState("");
  const [searchMethod, setSearchMethod] = useState<"제목" | "태그">("제목");
  const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
  const router = useRouter();

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

    router.push(
      [
        `${pathname}?page=1`,
        `&parentCategoryId=${parentCategoryId}`,
        `${childCategoryId !== null ? `&childCategoryId=${childCategoryId}` : ""}`,
        `${place !== "" ? `&place=${place}` : ""}`,
        `&order=${order}`,
        `${searchValue !== "" ? `${searchMethod === "제목" ? "&search" : "&tagName"}=${searchValue}` : ""}`,
      ].join(""),
    );
  };

  const handleSearchMethodChange = (value: "제목" | "태그") => {
    setSearchValue("");
    setSearchMethod(value);
  };

  usePreventBodyScroll(modalVisible);
  useModalBackHandler(modalVisible, () => setModalVisible(false));

  return {
    pathname,
    parentCategoryId,
    childCategoryId,
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
    handleSearchValueChange,
    handleSearchClick,
    handleSearchMethodChange,
  };
};
