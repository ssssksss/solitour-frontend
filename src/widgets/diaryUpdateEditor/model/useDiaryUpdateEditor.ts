"use client";

import {
  Diary,
  DiaryUpdateRequest,
  FEELING_STATUS,
  updateDiary,
} from "@/entities/diary";
import { DiaryFormSchema } from "@/features/diaryEditor";
import { SANITIZE_OPTION } from "@/shared/config";
import { useModalBackHandler, usePreventBodyScroll } from "@/shared/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import parse from "node-html-parser";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import sanitizeHtml from "sanitize-html";

export const useDiaryUpdateEditor = (diary: Diary) => {
  const router = useRouter();
  const [dateRangeModalVisible, setDateRangeModalVisible] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalThumbnailUrl, setOriginalThumbnailUrl] = useState("");
  const [originalContentUrl, setOriginalContentUrl] = useState<string[]>([]);
  const methods = useForm<{
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    address: string;
    image: string;
    moodLevels: number;
    contents: string;
  }>({
    resolver: zodResolver(DiaryFormSchema),
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

    const data: DiaryUpdateRequest = {
      title: title,
      deleteTitleImage: [image, ...contentImagesUrl.split(",")].includes(
        originalThumbnailUrl,
      )
        ? ""
        : originalThumbnailUrl,
      saveTitleImage: image,
      startDatetime: startDate!,
      endDatetime: endDate!,
      diaryDayRequests: [
        {
          content: sanitizeHtml(contents, SANITIZE_OPTION),
          feelingStatus: FEELING_STATUS[moodLevels],
          deleteImagesUrl: originalContentUrl
            .filter(
              (value) =>
                !contentImagesUrl.split(",").includes(value) && value !== image,
            )
            .join(","),
          saveImagesUrl: contentImagesUrl,
          place: address,
        },
      ],
    };

    setLoading(true);

    const response = await updateDiary(diary.diaryId, data);

    if (!response.ok) {
      alert("일기 수정에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    router.push(`/diary/${diary.diaryId}`);
    router.refresh();
  };

  usePreventBodyScroll(dateRangeModalVisible);
  usePreventBodyScroll(addressModalVisible);
  useModalBackHandler(dateRangeModalVisible, () =>
    setDateRangeModalVisible(false),
  );
  useModalBackHandler(addressModalVisible, () => setAddressModalVisible(false));

  useEffect(() => {
    methods.setValue("title", diary.title);
    methods.setValue(
      "startDate",
      new Date(
        new Date(
          new Date(diary.startDatetime).getTime() + 1000 * 60 * 60 * 24,
        ).toLocaleDateString("ko-KR"),
      ),
    );
    methods.setValue(
      "endDate",
      new Date(
        new Date(
          new Date(diary.endDatetime).getTime() + 1000 * 60 * 60 * 24,
        ).toLocaleDateString("ko-KR"),
      ),
    );
    methods.setValue(
      "address",
      diary.diaryDayContentResponses.diaryDayContentDetail[0].place,
    );
    methods.setValue(
      "moodLevels",
      Number(
        FEELING_STATUS[
          diary.diaryDayContentResponses.diaryDayContentDetail[0].feelingStatus
        ],
      ),
    );
    methods.setValue(
      "contents",
      diary.diaryDayContentResponses.diaryDayContentDetail[0].content,
    );

    methods.trigger();

    setOriginalThumbnailUrl(diary.titleImage);
    setOriginalContentUrl(
      diary.diaryDayContentResponses.diaryDayContentDetail[0].diaryDayContentImages.split(
        ",",
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
