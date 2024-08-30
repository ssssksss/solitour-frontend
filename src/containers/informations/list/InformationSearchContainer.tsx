"use client";

import InformationSearch from "@/components/informations/list/InformationSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const InformationSearchContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const parentCategoryId = searchParams.get("parentCategoryId")!;
  const childCategoryId = searchParams.get("childCategoryId");
  const place = searchParams.get("place") ?? "";
  const order = searchParams.get("order") ?? "latest";
  const [tagName, setTagName] = useState<string>("");
  const router = useRouter();

  const onChangeTagName = (value: string) => {
    setTagName(value.trim().slice(0, 15));
  };

  const searchByTagName = () => {
    router.push(
      `${pathname}?page=1&parentCategoryId=${parentCategoryId}${childCategoryId !== null ? `&childCategoryId=${childCategoryId}` : ""}${place !== "" ? `&place=${place}` : ""}&order=${order}${tagName !== "" ? `&tagName=${tagName}` : ""}`,
    );
  };

  return (
    <InformationSearch
      pathname={pathname}
      parentCategoryId={parentCategoryId}
      childCategoryId={childCategoryId}
      place={place}
      order={order}
      tagName={tagName}
      modalVisible={modalVisible}
      dropdownVisible={dropdownVisible}
      onChangeTagName={onChangeTagName}
      closeModal={() => setModalVisible(false)}
      openModal={() => setModalVisible(true)}
      onDropdownClick={() => setDropdownVisible(!dropdownVisible)}
      searchByTagName={searchByTagName}
    />
  );
};

export default InformationSearchContainer;
