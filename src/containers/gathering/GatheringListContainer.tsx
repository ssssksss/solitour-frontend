"use client";

import GatheringList from "@/components/gathering/GatheringList";
import { useState } from "react";

const GatheringListContainer = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <GatheringList
      isModal={isModal}
      closeModal={() => setIsModal(false)}
      openModal={() => setIsModal(true)}
    />
  );
};
export default GatheringListContainer;
