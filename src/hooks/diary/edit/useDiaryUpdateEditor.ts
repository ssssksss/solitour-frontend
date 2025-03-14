"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiaryUpdateFormSchema } from "@/lib/zod/schema/DiaryUpdateFormSchema";
import parse from "node-html-parser";
import { GetDiaryResponseDto, UpdateDiaryRequestDto } from "@/types/DiaryDto";
import sanitizeHtml from "sanitize-html";
import sanitizeOption from "@/shared/config/sanitizeOption";
import { FEELING_STATUS } from "@/entities/diary/config/feelingStatus";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import usePreventBodyScroll from "@/shared/lib/hooks/usePreventBodyScroll";
import { useModalBackHandler } from "@/shared/lib/hooks";

export const useDiaryUpdateEditor = (diaryData: GetDiaryResponseDto) => {
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
    resolver: zodResolver(DiaryUpdateFormSchema),
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

    const data: UpdateDiaryRequestDto = {
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
          content: sanitizeHtml(contents, sanitizeOption),
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

    const response = await fetchWithAuth(
      `/api/diary/${diaryData.diaryContentResponse.diaryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      alert("일기 수정에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    router.push(`/diary/${diaryData.diaryContentResponse.diaryId}`);
    router.refresh();
  };

  usePreventBodyScroll(dateRangeModalVisible);
  usePreventBodyScroll(addressModalVisible);
  useModalBackHandler(dateRangeModalVisible, () =>
    setDateRangeModalVisible(false),
  );
  useModalBackHandler(addressModalVisible, () => setAddressModalVisible(false));

  useEffect(() => {
    methods.setValue("title", diaryData.diaryContentResponse.title);
    methods.setValue(
      "startDate",
      new Date(
        new Date(
          new Date(diaryData.diaryContentResponse.startDatetime).getTime() +
            1000 * 60 * 60 * 24,
        ).toLocaleDateString("ko-KR"),
      ),
    );
    methods.setValue(
      "endDate",
      new Date(
        new Date(
          new Date(diaryData.diaryContentResponse.endDatetime).getTime() +
            1000 * 60 * 60 * 24,
        ).toLocaleDateString("ko-KR"),
      ),
    );
    methods.setValue(
      "address",
      diaryData.diaryContentResponse.diaryDayContentResponses
        .diaryDayContentDetail[0].place,
    );
    methods.setValue(
      "moodLevels",
      Number(
        FEELING_STATUS[
          diaryData.diaryContentResponse.diaryDayContentResponses
            .diaryDayContentDetail[0].feelingStatus
        ],
      ),
    );
    methods.setValue(
      "contents",
      diaryData.diaryContentResponse.diaryDayContentResponses
        .diaryDayContentDetail[0].content,
    );

    methods.trigger();

    setOriginalThumbnailUrl(diaryData.diaryContentResponse.titleImage);
    setOriginalContentUrl(
      diaryData.diaryContentResponse.diaryDayContentResponses.diaryDayContentDetail[0].diaryDayContentImages.split(
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
