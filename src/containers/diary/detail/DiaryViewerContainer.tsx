"use client";

import DiaryViewer from "@/components/diary/detail/DiaryViewer";
import { GetDiaryResponseDto } from "@/types/DiaryDto";
import { useState } from "react";

interface Props {
  data: GetDiaryResponseDto;
}

const DiaryViewerContainer = ({ data }: Props) => {
  const [currentDay, setCurrentDay] = useState<number>(1);

  const changeDay = (day: number) => {
    setCurrentDay(day);
  };

  return (
    <DiaryViewer data={data} currentDay={currentDay} changeDay={changeDay} />
  );
};

export default DiaryViewerContainer;
