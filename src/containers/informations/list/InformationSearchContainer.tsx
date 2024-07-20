"use client";

import InformationSearch from "@/components/informations/list/InformationSearch";
import { useState } from "react";

const InformationSearchContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <InformationSearch
      modalVisible={modalVisible}
      closeModal={() => setModalVisible(false)}
      openModal={() => setModalVisible(true)}
    />
  );
};

export default InformationSearchContainer;
