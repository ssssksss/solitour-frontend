import { useEffect, useState } from "react";
import usePreventBodyScroll from "../usePreventBodyScroll";
import useModalBackHandler from "../useModalBackHandler";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export const useDiaryViewer = (diaryId: number) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    window.history.back();
    setModalVisible(false);
  };

  const handleDeleteClick = async () => {
    setLoading(true);

    const response = await fetchWithAuth(`/api/diary/${diaryId}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      alert("일기 삭제에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    router.replace("/diary/list?page=1");
    router.refresh();
  };

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
        });
    }, 100);
  }, []);

  return {
    modalVisible,
    loading,
    openModal,
    closeModal,
    handleDeleteClick,
  };
};
