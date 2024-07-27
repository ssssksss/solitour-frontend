"use client";

import InformationSearch from "@/components/informations/list/InformationSearch";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const InformationSearchContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const place = searchParams.get("place") ?? "";
  const order = searchParams.get("order") ?? "latest";

  return (
    <InformationSearch
      pathname={pathname}
      place={place}
      order={order}
      modalVisible={modalVisible}
      dropdownVisible={dropdownVisible}
      closeModal={() => setModalVisible(false)}
      openModal={() => setModalVisible(true)}
      onDropdownClick={() => setDropdownVisible(!dropdownVisible)}
    />
  );
};

export default InformationSearchContainer;
