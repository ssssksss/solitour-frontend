"use client";

import DateRangeModal from "@/components/diary/write/DateRangeModal";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { useState } from "react";

interface Props {
  closeModal: () => void;
}

const DateRangeModalContainer = ({ closeModal }: Props) => {
  const diaryEditorStore = useDiaryEditorStore();
  const [state, setState] = useState<
    { startDate: Date | null; endDate: Date | null; key: string }[]
  >([{ startDate: new Date(), endDate: null, key: "selection" }]);

  const onChangeDateRange = () => {
    diaryEditorStore.setDiaryEditor({
      startDate: state[0].startDate,
      endDate: state[0].endDate,
    });
    closeModal();
  };

  const onResetDateRange = () => {
    diaryEditorStore.setDiaryEditor({
      startDate: null,
      endDate: null,
    });
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
