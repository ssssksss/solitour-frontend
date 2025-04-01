"use client";

import { useFormContext } from "react-hook-form";
import { GatheringForm } from "./gatheringForm";
import { useState } from "react";
import { add, compareAsc, format, isValid } from "date-fns";

export const useGatheringDeadlineModal = (closeModal: () => void) => {
  const formContext = useFormContext<GatheringForm>();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [deadlineDate, setDeadlineDate] = useState<Date>(
    formContext.getValues("deadline")
      ? new Date(formContext.getValues("deadline"))
      : new Date(),
  );
  const scheduleStartDate = formContext.getValues("scheduleStartDate");

  // maxDate를 결정하는 함수
  const getMaxDate = () => {
    const today = new Date();
    // 현재날짜에서 +1년되는 날짜
    const oneYearFromToday = add(today, { years: 1 });

    if (scheduleStartDate) {
      const scheduleDate = new Date(scheduleStartDate);
      // 날짜가 유효한지 확인
      if (isValid(scheduleDate)) {
        return compareAsc(new Date(scheduleStartDate), oneYearFromToday) < 1
          ? new Date(scheduleStartDate)
          : oneYearFromToday;
      }
    }

    // scheduleStartDate가 없거나 유효하지 않으면 1년 후 날짜를 반환
    return oneYearFromToday;
  };

  const handleDateSelect = (date: Date) => {
    setDeadlineDate(date);
  };

  const handleSubmit = () => {
    const deadline = format(deadlineDate, "yyyy-MM-dd 23:59");
    formContext.setValue("deadline", deadline);
    formContext.watch();
    formContext.trigger("deadline");
    closeModal();
  };

  return {
    year,
    month,
    deadlineDate,
    setYear,
    setMonth,
    getMaxDate,
    handleDateSelect,
    handleSubmit,
  };
};
