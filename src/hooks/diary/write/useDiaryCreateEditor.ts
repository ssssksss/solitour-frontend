"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiaryCreateFormSchema } from "@/features/diary/model/DiaryCreateFormSchema";
import parse from "node-html-parser";
import { CreateDiaryRequestDto } from "@/types/DiaryDto";
import sanitizeOption from "@/shared/config/sanitizeOption";
import { FEELING_STATUS } from "@/entities/diary/config/feelingStatus";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import sanitizeHtml from "sanitize-html";
import usePreventBodyScroll from "@/shared/lib/hooks/usePreventBodyScroll";
import { useModalBackHandler } from "@/shared/lib/hooks";

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
          content: sanitizeHtml(contents, sanitizeOption),
          feelingStatus: FEELING_STATUS[moodLevels],
          diaryDayContentImages: contentImagesUrl,
          place: address,
        },
      ],
    };

    setLoading(true);

    const response = await fetchWithAuth("/api/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

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
