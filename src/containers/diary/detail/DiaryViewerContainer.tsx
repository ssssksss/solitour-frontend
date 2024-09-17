"use client";

import DiaryViewer from "@/components/diary/detail/DiaryViewer";
import useModalBackHandler from "@/hooks/useModalBackHandler";
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import { GetDiaryResponseDto } from "@/types/DiaryDto";
import { useEffect, useMemo, useState } from "react";

interface Props {
  data: GetDiaryResponseDto;
}

const DiaryViewerContainer = ({ data }: Props) => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const days = useMemo(
    () =>
      (new Date(data.diaryContentResponse.endDatetime).getTime() -
        new Date(data.diaryContentResponse.startDatetime).getTime()) /
        (1000 * 60 * 60 * 24) +
      1,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const changeDay = (day: number) => {
    setCurrentDay(day);
  };

  usePreventBodyScroll(modalVisible);
  useModalBackHandler(modalVisible, () => setModalVisible(false));

  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll("img").forEach((img) => {
        img.style.borderRadius = "1rem";
      });
    }, 100);
  }, []);

  return (
    <DiaryViewer
      data={data}
      days={days}
      currentDay={currentDay}
      modalVisible={modalVisible}
      changeDay={changeDay}
      openModal={() => setModalVisible(true)}
      closeModal={() => {
        window.history.back();
        setModalVisible(false);
      }}
    />
  );
};

export default DiaryViewerContainer;
