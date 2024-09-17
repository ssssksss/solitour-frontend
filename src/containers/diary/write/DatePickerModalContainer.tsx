"use client";

import DatePickerModal from "@/components/diary/write/DatePickerModal";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  closeModal: () => void;
}

const DatePickerModalContainer = ({ closeModal }: Props) => {
  const diaryEditorStore = useDiaryEditorStore();
  const [date, setDate] = useState(new Date());
  const formContext = useFormContext();

  const onChangeDateRange = () => {
    const days = 1;
    formContext.setValue("startDate", date);
    formContext.setValue("endDate", date);

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

  return (
    <DatePickerModal
      date={date}
      setDate={(date: Date) => setDate(date)}
      closeModal={closeModal}
      onChangeDateRange={onChangeDateRange}
    />
  );
};

export default DatePickerModalContainer;
