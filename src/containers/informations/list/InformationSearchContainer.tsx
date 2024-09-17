"use client";

import InformationSearch from "@/components/informations/list/InformationSearch";
import useModalBackHandler from "@/hooks/useModalBackHandler";
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const InformationSearchContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [orderDropdownVisible, setOrderDropdownVisible] =
    useState<boolean>(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const parentCategoryId = searchParams.get("parentCategoryId")!;
  const childCategoryId = searchParams.get("childCategoryId");
  const place = searchParams.get("place") ?? "";
  const order = searchParams.get("order") ?? "latest";
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchMethod, setSearchMethod] = useState<string>("제목");
  const [searchDropdownVisible, setSearchDropdownVisible] =
    useState<boolean>(false);
  const router = useRouter();

  usePreventBodyScroll(modalVisible);
  useModalBackHandler(modalVisible, () => setModalVisible(false));

  const onChangeSearchValue = (value: string) => {
    if (searchMethod === "제목") {
      setSearchValue(value.slice(0, 50));
    } else {
      setSearchValue(value.trim().slice(0, 15));
    }
  };

  const onSearchClick = () => {
    if (searchMethod === "제목" && searchValue.length < 1) {
      alert("최소 한 글자의 제목을 입력해 주세요.");
      return;
    }

    if (searchMethod === "태그" && searchValue.length < 2) {
      alert("2 ~ 15자의 태그를 입력해 주세요.");
      return;
    }

    router.push(
      `${pathname}?page=1&parentCategoryId=${parentCategoryId}${childCategoryId !== null ? `&childCategoryId=${childCategoryId}` : ""}${place !== "" ? `&place=${place}` : ""}&order=${order}${searchValue !== "" ? `${searchMethod === "제목" ? "&search" : "&tagName"}=${searchValue}` : ""}`,
    );
  };

  return (
    <InformationSearch
      pathname={pathname}
      parentCategoryId={parentCategoryId}
      childCategoryId={childCategoryId}
      place={place}
      order={order}
      searchMethod={searchMethod}
      searchValue={searchValue}
      modalVisible={modalVisible}
      orderDropdownVisible={orderDropdownVisible}
      searchDropdownVisible={searchDropdownVisible}
      onChangeSearchValue={onChangeSearchValue}
      closeModal={() => setModalVisible(false)}
      openModal={() => setModalVisible(true)}
      onOrderDropdownClick={() =>
        setOrderDropdownVisible(!orderDropdownVisible)
      }
      onSearchDropdownClick={() =>
        setSearchDropdownVisible(!searchDropdownVisible)
      }
      onSearchClick={onSearchClick}
      setSearchMethod={(value: string) => {
        setSearchValue("");
        setSearchMethod(value);
      }}
    />
  );
};

export default InformationSearchContainer;
