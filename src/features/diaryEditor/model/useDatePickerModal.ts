"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { DiaryForm } from "./diaryForm";

export const useDatePickerModal = (closeModal: () => void) => {
  const [date, setDate] = useState(new Date(new Date().toDateString()));
  const formContext = useFormContext<DiaryForm>();

  const handleDateRangeChange = () => {
    formContext.setValue("startDate", date);
    formContext.setValue("endDate", date);
    formContext.trigger("startDate");
    formContext.trigger("endDate");
    closeModal();
  };

  return { date, setDate, handleDateRangeChange };
};
