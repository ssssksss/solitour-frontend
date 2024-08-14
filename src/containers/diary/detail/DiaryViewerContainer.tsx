"use client";

import DiaryViewer from "@/components/diary/detail/DiaryViewer";
import { GetDiaryResponseDto } from "@/types/DiaryDto";
import { useMemo, useState } from "react";

interface Props {
  data: GetDiaryResponseDto;
}

const DiaryViewerContainer = ({ data }: Props) => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const days = useMemo(
    () =>
      (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) /
        (1000 * 60 * 60 * 24) +
      1,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const changeDay = (day: number) => {
    setCurrentDay(day);
  };

  return (
    <DiaryViewer
      data={data}
      days={days}
      currentDay={currentDay}
      changeDay={changeDay}
    />
  );
};

export default DiaryViewerContainer;
