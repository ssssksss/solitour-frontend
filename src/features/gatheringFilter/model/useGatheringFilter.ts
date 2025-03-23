"use client";

import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGatheringFilter = (closeModal: () => void) => {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || 0);
  const [sex, setSex] = useState(searchParams.get("allowedSex") || "ALL");
  const [startAge, setStartAge] = useState<number | undefined>(
    searchParams.get("startAge") ? Number(searchParams.get("startAge")) : 20,
  );
  const [endAge, setEndAge] = useState<number | undefined>(
    searchParams.get("endAge") ? Number(searchParams.get("endAge")) : 59,
  );
  const [isFilterSchedule, setIsFilterSchedule] = useState(
    searchParams.get("startDate") || searchParams.get("endDate") ? true : false,
  );
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [calendarDate, setCalendarDate] = useState([
    {
      startDate: searchParams.get("startDate")
        ? new Date(searchParams.get("startDate") as string)
        : new Date(),
      endDate: searchParams.get("endDate")
        ? new Date(searchParams.get("endDate") as string)
        : new Date(),
      key: "selection",
    },
  ]);
  const [directInput, setDirectInput] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAgeChange = ({
    _startAge,
    _endAge,
  }: {
    _startAge: number;
    _endAge: number;
  }) => {
    setDirectInput(false);
    if ((endAge || 0) + 1 == _startAge) {
      setEndAge(_endAge);
    } else if ((startAge || 0) - 1 == _endAge) {
      setStartAge(_startAge);
    } else {
      setStartAge(_startAge);
      setEndAge(_endAge);
    }
  };

  const handleInitButtonClick = () => {
    setLocation(0);
    setSex("ALL");
    setStartAge(20);
    setEndAge(59);
    setCalendarDate([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    setIsFilterSchedule(false);
  };

  const handleSubmit = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("location");
    params.delete("startAge");
    params.delete("endAge");
    params.delete("allowedSex");
    params.delete("startDate");
    params.delete("endDate");
    // 지역
    if (location != 0) {
      params.set("location", location + "");
    }
    // 성별
    if (sex != "ALL") {
      params.set("allowedSex", sex + "");
    }
    // 최소나이
    if (startAge != 20 || endAge != 59) {
      params.set("startAge", startAge + "");
      params.set("endAge", endAge + "");
    }
    // 일정 선택
    if (isFilterSchedule) {
      params.set("startDate", format(calendarDate[0].startDate, "yyyy-MM-dd"));
      params.set("endDate", format(calendarDate[0].endDate, "yyyy-MM-dd"));
    }
    params.delete("page");
    url.search = params.toString();
    closeModal();
    setTimeout(() => {
      window.history.pushState({}, "", url.toString());
    }, 100);
  };

  useEffect(() => {
    setLocation(+(searchParams.get("location") || 0));
    setSex(searchParams.get("allowedSex") || "ALL");
    setStartAge(+(searchParams.get("startAge") || 20));
    setEndAge(+(searchParams.get("endAge") || 59));
    setCalendarDate([
      {
        startDate: searchParams.get("startDate")
          ? new Date(searchParams.get("startDate") as string)
          : new Date(),
        endDate: searchParams.get("endDate")
          ? new Date(searchParams.get("endDate") as string)
          : new Date(),
        key: "selection",
      },
    ]);
  }, [searchParams]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    loading,
    location,
    sex,
    startAge,
    endAge,
    isFilterSchedule,
    year,
    month,
    calendarDate,
    directInput,
    setLocation,
    setSex,
    setStartAge,
    setEndAge,
    setIsFilterSchedule,
    setYear,
    setMonth,
    setCalendarDate,
    setDirectInput,
    handleAgeChange,
    handleInitButtonClick,
    handleSubmit,
  };
};
