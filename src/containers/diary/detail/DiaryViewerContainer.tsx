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
      (new Date(data.diaryContentResponse.endDateTime).getTime() -
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

  return (
    <DiaryViewer
      data={data}
      days={days}
      currentDay={currentDay}
      modalVisible={modalVisible}
      changeDay={changeDay}
      openModal={() => setModalVisible(true)}
      closeModal={() => setModalVisible(false)}
    />
  );
};

export default DiaryViewerContainer;
