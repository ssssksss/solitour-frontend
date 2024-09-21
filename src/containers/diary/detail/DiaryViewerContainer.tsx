"use client";

import DiaryViewer from "@/components/diary/detail/DiaryViewer";
import useModalBackHandler from "@/hooks/useModalBackHandler";
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import { GetDiaryResponseDto } from "@/types/DiaryDto";
import { useEffect, useState } from "react";

interface Props {
  data: GetDiaryResponseDto;
}

const DiaryViewerContainer = ({ data }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  usePreventBodyScroll(modalVisible);
  useModalBackHandler(modalVisible, () => setModalVisible(false));

  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector(".diaryViewerContent")
        ?.querySelectorAll("img")
        .forEach((img) => {
          img.style.borderRadius = "1rem";
          img.style.boxShadow =
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
        });
    }, 100);
  }, []);

  return (
    <DiaryViewer
      data={data}
      modalVisible={modalVisible}
      openModal={() => setModalVisible(true)}
      closeModal={() => {
        window.history.back();
        setModalVisible(false);
      }}
    />
  );
};

export default DiaryViewerContainer;
