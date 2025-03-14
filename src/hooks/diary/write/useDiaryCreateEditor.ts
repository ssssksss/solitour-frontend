"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import parse from "node-html-parser";
import sanitizeHtml from "sanitize-html";
import { useModalBackHandler, usePreventBodyScroll } from "@/shared/lib/hooks";
import { DiaryCreateFormSchema } from "@/features/diary";
import { FEELING_STATUS } from "@/entities/diary";
import { SANITIZE_OPTION } from "@/shared/config";
import { fetchWithAuth } from "@/shared/api";

/**
 * 일기 작성 요청 DTO
 */
interface CreateDiaryRequestDto {
  title: string;
  titleImage: string;
  startDatetime: Date;
  endDatetime: Date;
  diaryDayRequests: {
    content: string;
    feelingStatus: string;
    diaryDayContentImages: string;
    place: string;
  }[];
}

export const useDiaryCreateEditor = () => {
  const router = useRouter();
  const [dateRangeModalVisible, setDateRangeModalVisible] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const methods = useForm<{
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    address: string;
    image: string;
    moodLevels: number;
    contents: string;
  }>({
    resolver: zodResolver(DiaryCreateFormSchema),
    defaultValues: {
      title: "",
      startDate: null,
      endDate: null,
      address: "",
      image: "",
      moodLevels: 0,
      contents: "",
    },
    mode: "onChange",
  });

  const openDateRangeModal = () => {
    setDateRangeModalVisible(true);
  };

  const closeDateRangeModal = () => {
    window.history.back();
    setDateRangeModalVisible(false);
  };

  const openAddressModal = () => {
    setAddressModalVisible(true);
  };

  const closeAddressModal = () => {
    window.history.back();
    setAddressModalVisible(false);
  };

  const handleSubmit = async () => {
    const imageUrl =
      parse(methods.getValues("contents"))
        .querySelector("img")
        ?.getAttribute("src") ?? "";

    const contentImagesUrl = parse(methods.getValues("contents"))
      .querySelectorAll("img")
      .filter((img) => img.getAttribute("src") !== imageUrl)
      .map((img) => img.getAttribute("src") ?? "")
      .join(",");

    methods.setValue("image", imageUrl);

    await methods.trigger();
    if (!methods.formState.isValid) {
      methods.trigger();
      alert("모든 정보를 입력해 주세요.");
      return;
    }

    const { title, image, startDate, endDate, contents, moodLevels, address } =
      methods.getValues();

    const data: CreateDiaryRequestDto = {
      title: title,
      titleImage: image,
      startDatetime: startDate!,
      endDatetime: endDate!,
      diaryDayRequests: [
        {
          content: sanitizeHtml(contents, SANITIZE_OPTION),
          feelingStatus: FEELING_STATUS[moodLevels],
          diaryDayContentImages: contentImagesUrl,
          place: address,
        },
      ],
    };

    setLoading(true);

    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/diary`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      alert("일기 작성에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    const diaryId = await response.text();
    router.push(`/diary/${diaryId}`);
    router.refresh();
  };

  usePreventBodyScroll(dateRangeModalVisible);
  usePreventBodyScroll(addressModalVisible);
  useModalBackHandler(dateRangeModalVisible, () =>
    setDateRangeModalVisible(false),
  );
  useModalBackHandler(addressModalVisible, () => setAddressModalVisible(false));

  return {
    loading,
    methods,
    dateRangeModalVisible,
    addressModalVisible,
    openDateRangeModal,
    closeDateRangeModal,
    openAddressModal,
    closeAddressModal,
    handleSubmit,
  };
};
