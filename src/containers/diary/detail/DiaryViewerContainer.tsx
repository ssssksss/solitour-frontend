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
    // Intersection Observer 설정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 요소가 화면에 보이면 fadeIn 애니메이션 적용
            (entry.target as HTMLElement).style.opacity = "1";
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.5 }, // 요소가 50% 이상 보일 때 트리거
    );

    setTimeout(() => {
      Array.from(
        document.querySelector(".diaryViewerContent")?.children!,
      ).forEach((element) => {
        (element as HTMLElement).style.opacity = "0";
        observer.observe(element); // 요소 관찰 시작
      });

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
