"use client";

import DiaryCard from "@/components/diary/list/DiaryCard";
import { useMemo, useState } from "react";

interface Props {
  diaryData: {
    diaryId: number;
    title: string;
    titleImage: string;
    startDatetime: Date;
    endDatetime: Date;
    diaryDayContentResponses: {
      diaryDayContentDetail: {
        content: string;
        feelingStatus: string;
        place: string;
      }[];
    };
  };
}

const DiaryCardContainer = ({ diaryData }: Props) => {
  const [flag, setFlag] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const days = useMemo(
    () =>
      (new Date(diaryData.endDatetime).getTime() -
        new Date(diaryData.startDatetime).getTime()) /
        (1000 * 60 * 60 * 24) +
      1,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const flip = async () => {
    setFlag(!flag);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setIsFlipped(!isFlipped);
  };

  return (
    <DiaryCard
      diaryData={diaryData}
      flag={flag}
      isFlipped={isFlipped}
      days={days}
      currentDay={currentDay}
      flip={flip}
      setCurrentDay={(day: number) => setCurrentDay(day)}
    />
  );
};

export default DiaryCardContainer;
