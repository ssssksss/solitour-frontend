"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import { useState } from "react";

const DiaryEditorContainer = () => {
  const [dateRangeModal, setDateRangeModal] = useState<boolean>(false);
  const [placeModal, setPlaceModal] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [content, setContent] = useState<string>("");

  const onChange = (value: string) => {
    setContent(value);
  };

  return (
    <DiaryEditor
      dateRangeModal={dateRangeModal}
      placeModal={placeModal}
      currentDay={currentDay}
      content={content}
      showDateRangeModal={() => setDateRangeModal(true)}
      closeDateRangeModal={() => setDateRangeModal(false)}
      showPlaceModal={() => setPlaceModal(true)}
      closePlaceModal={() => setPlaceModal(false)}
      setCurrentDay={(day: number) => {
        setCurrentDay(day);
      }}
      onChange={onChange}
    />
  );
};

export default DiaryEditorContainer;
