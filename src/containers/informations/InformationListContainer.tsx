"use client";

import InformationList from "@/components/informations/InformationList";
import { useState } from "react";

type MyProps = {
  category: string;
  subCategory: string;
};

const InformationListContainer = ({ category, subCategory }: MyProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <InformationList
      category={category}
      subCategory={subCategory}
      isModal={isModal}
      closeModal={() => setIsModal(false)}
      openModal={() => setIsModal(true)}
    />
  );
};

export default InformationListContainer;
