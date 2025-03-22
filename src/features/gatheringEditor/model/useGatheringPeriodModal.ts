"use client";

import { useThrottle } from "@/shared/lib/hooks";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export const useGatheringPeriodModal = (closeModal: () => void) => {
  const formContext = useFormContext();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [calendarDate, setCalendarDate] = useState([
    {
      startDate: formContext.getValues("scheduleStartDate")
        ? new Date(formContext.getValues("scheduleStartDate"))
        : addDays(new Date(), 1),
      endDate: formContext.getValues("scheduleEndDate")
        ? new Date(formContext.getValues("scheduleEndDate"))
        : addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const handleSubmit = () => {
    let _dateTime =
      format(new Date(calendarDate[0].startDate), "yyyy-MM-dd") +
      " " +
      (formContext.getValues("scheduleStartDate")
        ? format(new Date(formContext.getValues("scheduleStartDate")), "HH:mm")
        : "12:00");

    formContext.setValue("scheduleStartDate", _dateTime);
    if (calendarDate[0].startDate == calendarDate[0].endDate) {
      formContext.setValue(
        "scheduleEndDate",
        format(new Date(calendarDate[0].startDate), "yyyy-MM-dd") +
          " " +
          "23:59",
      );
    } else {
      formContext.setValue(
        "scheduleEndDate",
        format(new Date(calendarDate[0].endDate), "yyyy-MM-dd") + " " + "23:59",
      );
    }
    formContext.watch();
    formContext.trigger("scheduleStartDate");
    formContext.trigger("scheduleEndDate");
    closeModal();
  };

  const handleWindowResize = useThrottle(() => {
    setWindowWidth(window.innerWidth);
  }, 100);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return {
    formContext,
    year,
    month,
    windowWidth,
    calendarDate,
    setYear,
    setMonth,
    setCalendarDate,
    handleSubmit,
  };
};
