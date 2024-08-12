"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { useEffect, useState } from "react";

const DiaryEditorContainer = () => {
  const diaryEditorStore = useDiaryEditorStore();
  const [dateRangeModal, setDateRangeModal] = useState<boolean>(false);
  const [placeModal, setPlaceModal] = useState<boolean>(false);

  const onChange = (value: string) => {
    const content = diaryEditorStore.contents;
    if (content) {
      content[diaryEditorStore.currentDay] = value;
    }
    diaryEditorStore.setDiaryEditor({ contents: content });
  };

  // 화면에서 벗어났을 때 초기화
  useEffect(() => {
    return () => {
      diaryEditorStore.initialize();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DiaryEditor
      diaryEditorStore={diaryEditorStore}
      dateRangeModal={dateRangeModal}
      placeModal={placeModal}
      showDateRangeModal={() => setDateRangeModal(true)}
      closeDateRangeModal={() => setDateRangeModal(false)}
      showPlaceModal={() => setPlaceModal(true)}
      closePlaceModal={() => setPlaceModal(false)}
      setCurrentDay={(day: number) => {
        diaryEditorStore.setDiaryEditor({ currentDay: day });
      }}
      onChange={onChange}
    />
  );
};

export default DiaryEditorContainer;
