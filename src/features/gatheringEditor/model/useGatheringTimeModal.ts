"use client";

import { format } from "date-fns";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export const useGatheringTimeModal = (closeModal: () => void) => {
  const formContext = useFormContext();
  const [startDatetime, setStartDatetime] = useState({
    hour: formContext.getValues("scheduleStartDate")
      ? +format(new Date(formContext.getValues("scheduleStartDate")), "HH")
      : new Date().getHours(),
    minute: formContext.getValues("scheduleStartDate")
      ? +format(new Date(formContext.getValues("scheduleStartDate")), "mm")
      : Math.min(50, Math.ceil(new Date().getMinutes() / 10) * 10),
  });

  const handleSubmit = () => {
    formContext.setValue(
      "scheduleStartDate",
      format(
        new Date(formContext.getValues("scheduleStartDate")),
        "yyyy-MM-dd ",
      ) +
        (startDatetime.hour + "").padStart(2, "0") +
        ":" +
        (startDatetime.minute + "").padStart(2, "0"),
    );
    formContext.watch();
    formContext.trigger(["scheduleStartDate"]);
    closeModal();
  };

  return { formContext, startDatetime, setStartDatetime, handleSubmit };
};
