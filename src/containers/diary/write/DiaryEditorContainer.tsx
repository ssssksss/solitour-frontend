"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { useState } from "react";

const DiaryEditorContainer = () => {
  const [dateRangeModal, setDateRangeModal] = useState<boolean>(false);
  const [placeModal, setPlaceModal] = useState<boolean>(false);
  const diaryEditorStore = useDiaryEditorStore();
  const [currentDay, setCurrentDay] = useState<number>(1); // TODO
  const [content, setContent] = useState<string>(""); // TODO

  const onChange = (value: string) => {
    setContent(value);
  };

  return (
    <DiaryEditor
      diaryEditorStore={diaryEditorStore}
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
