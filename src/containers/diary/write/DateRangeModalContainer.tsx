"use client";

import DateRangeModal from "@/components/diary/write/DateRangeModal";
import { useState } from "react";

interface Props {
  closeModal: () => void;
}

const DateRangeModalContainer = ({ closeModal }: Props) => {
  const [state, setState] = useState<
    { startDate: Date | null; endDate: Date | null; key: string }[]
  >([{ startDate: new Date(), endDate: null, key: "selection" }]);

  const onResetDateRange = () => {
    alert(`${state[0].startDate}, ${state[0].endDate}`);
    closeModal();
  };

  return (
    <DateRangeModal
      state={state}
      setState={setState}
      onResetDateRange={onResetDateRange}
    />
  );
};

export default DateRangeModalContainer;
