"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import { useState } from "react";

const DiaryEditorContainer = () => {
  const [placeModal, setPlaceModal] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [content, setContent] = useState<string>("");

  const onChange = (value: string) => {
    setContent(value);
  };

  return (
    <DiaryEditor
      content={content}
      placeModal={placeModal}
      onChange={onChange}
      currentDay={currentDay}
      showPlaceModal={() => setPlaceModal(true)}
      closePlaceModal={() => setPlaceModal(false)}
      setCurrentDay={(day: number) => {
        setCurrentDay(day);
      }}
    />
  );
};

export default DiaryEditorContainer;
