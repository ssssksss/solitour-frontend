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
  const [isStartDateSelected, setIsStartDateSelectec] = useState(false);
  const formContext = useFormContext();

  const onChangeDateRange = () => {
    const days = Math.floor(
      (state[0].endDate.getTime() - state[0].startDate.getTime()) /
        (1000 * 60 * 60 * 24) +
        1,
    );

    formContext.setValue("startDate", state[0].startDate);
    formContext.setValue("endDate", state[0].endDate);

    let addressList: string[] = formContext.getValues("address");
    let moodLevels: number[] = formContext.getValues("moodLevels");
    let contents: string[] = formContext.getValues("contents");
    const dayDifference = days - diaryEditorStore.days;

    if (dayDifference > 0) {
      for (let i = 0; i < dayDifference; i++) {
        addressList.push("");
        moodLevels.push(0);
        contents.push("");
      }
    }

    formContext.setValue("address", addressList.slice(0, days));
    formContext.setValue("moodLevels", moodLevels.slice(0, days));
    formContext.setValue("contents", contents.slice(0, days));

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
      isStartDateSelected={isStartDateSelected}
      setState={setState}
      setIsStartDateSelected={setIsStartDateSelectec}
      closeModal={closeModal}
      onChangeDateRange={onChangeDateRange}
    />
  );
};

export default DateRangeModalContainer;
