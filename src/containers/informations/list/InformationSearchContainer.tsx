"use client";

import InformationSearch from "@/components/informations/list/InformationSearch";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const InformationSearchContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const place = useSearchParams().get("place") ?? "";

  return (
    <InformationSearch
      place={place}
      modalVisible={modalVisible}
      closeModal={() => setModalVisible(false)}
      openModal={() => setModalVisible(true)}
    />
  );
};

export default InformationSearchContainer;
