"use client";

import MeetingsList from "@/components/meetings/MeetingsList";
import { useState } from "react";

const MeetingsListContainer = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <MeetingsList
      isModal={isModal}
      closeModal={() => setIsModal(false)}
      openModal={() => setIsModal(true)}
    />
  );
};
export default MeetingsListContainer;
