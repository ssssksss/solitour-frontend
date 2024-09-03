"use client";

import DateRangeModal from "@/components/diary/write/DateRangeModal";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

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
  const formContext = useFormContext();

  const onChangeDateRange = () => {
    const days = Math.floor(
      (state[0].endDate.getTime() - state[0].startDate.getTime()) /
        (1000 * 60 * 60 * 24) +
        1,
    );

    formContext.setValue("startDate", state[0].startDate);
    formContext.setValue("endDate", state[0].endDate);
    formContext.setValue("address", Array<string>(days).fill(""));
    formContext.setValue("moodLevels", Array<number>(days).fill(0));
    formContext.setValue("contents", Array<string>(days).fill(""));

    diaryEditorStore.setDiaryEditor({
      days: days,
      currentDay: 1,
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
