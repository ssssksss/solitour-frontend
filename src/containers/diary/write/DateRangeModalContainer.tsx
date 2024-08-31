"use client";

import DateRangeModal from "@/components/diary/write/DateRangeModal";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { useEffect, useState } from "react";

interface Props {
  closeModal: () => void;
}

const DateRangeModalContainer = ({ closeModal }: Props) => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const diaryEditorStore = useDiaryEditorStore();
  const [state, setState] = useState([
    {
      startDate: new Date(new Date().toLocaleDateString("ko-KR")),
      endDate: new Date(new Date().toLocaleDateString("ko-KR")),
      key: "selection",
    },
  ]);

  const onChangeDateRange = () => {
    const days = Math.floor(
      (state[0].endDate.getTime() - state[0].startDate.getTime()) /
        (1000 * 60 * 60 * 24) +
        1,
    );

    diaryEditorStore.setDiaryEditor({
      startDate: state[0].startDate,
      endDate: state[0].endDate,
      days: days,
      currentDay: 1,
      address: Array<string>(days).fill(""),
      moodLevels: Array<number>(days).fill(0),
      contents: Array<string>(days).fill(""),
    });
    closeModal();
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <DateRangeModal
      width={width}
      state={state}
      setState={setState}
      closeModal={closeModal}
      onChangeDateRange={onChangeDateRange}
    />
  );
};

export default DateRangeModalContainer;
