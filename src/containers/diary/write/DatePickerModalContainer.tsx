"use client";

import DatePickerModal from "@/components/diary/write/DatePickerModal";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  closeModal: () => void;
}

const DatePickerModalContainer = ({ closeModal }: Props) => {
  const [date, setDate] = useState(new Date());
  const formContext = useFormContext();

  const onChangeDateRange = () => {
    formContext.setValue("startDate", date);
    formContext.setValue("endDate", date);
    formContext.trigger("startDate");
    formContext.trigger("endDate");
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
