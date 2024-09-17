"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import sanitizeOption from "@/constants/common/sanitizeOption";
import { FEELING_STATUS } from "@/constants/diary/feelingStatus";
import { DiaryUpdateFormSchema } from "@/lib/zod/schema/DiaryUpdateFormSchema";
import useAuthStore from "@/store/authStore";
import { GetDiaryResponseDto, UpdateDiaryRequestDto } from "@/types/DiaryDto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { parse } from "node-html-parser";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import useModalBackHandler from "@/hooks/useModalBackHandler";

interface Props {
  diaryData: GetDiaryResponseDto;
}

const DiaryEditorContainer = ({ diaryData }: Props) => {
  const router = useRouter();
  const authStore = useAuthStore();
  const [dateRangeModal, setDateRangeModal] = useState<boolean>(false);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [originalThumbnailUrl, setOriginalThumbnailUrl] = useState<string>("");
  const [originalContentUrl, setOriginalContentUrl] = useState<string[]>([]);

  usePreventBodyScroll(dateRangeModal);
  usePreventBodyScroll(addressModal);
  useModalBackHandler(dateRangeModal, () => setDateRangeModal(false));
  useModalBackHandler(addressModal, () => setAddressModal(false));

  const methods = useForm<{
    userId: number;
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
      userId: authStore.id,
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

  const onSubmit = async () => {
    const imageUrl =
      parse(methods.getValues("contents"))
        .querySelector("img")
        ?.getAttribute("src") ?? "";

    const contentImagesUrl = parse(methods.getValues("contents"))
      .querySelectorAll("img")
      .filter((img) => img.getAttribute("src") !== imageUrl)
      .map((img) => img.getAttribute("src") ?? "")
      .join(",");

    if (imageUrl === "") {
      alert("Day1에 최소 1장의 이미지를 등록해 주세요.");
      return;
    }

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
      deleteTitleImage: ![image, ...contentImagesUrl[0].split(",")].includes(
        originalThumbnailUrl,
      )
        ? originalThumbnailUrl
        : "",
      saveTitleImage: image,
      startDatetime: startDate!,
      endDatetime: endDate!,
      diaryDayRequests: [
        {
          content: sanitizeHtml(contents, sanitizeOption),
          feelingStatus: FEELING_STATUS[moodLevels],
          deleteImagesUrl: originalContentUrl
            .filter((value) => !contentImagesUrl.split(",").includes(value))
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

  return (
    <FormProvider {...methods}>
      <DiaryEditor
        text="수정"
        datePickerModal={dateRangeModal}
        addressModal={addressModal}
        loading={loading}
        showDateRangeModal={() => setDateRangeModal(true)}
        closeDateRangeModal={() => {
          window.history.back();
          setDateRangeModal(false);
        }}
        showAddressModal={() => setAddressModal(true)}
        closeAddressModal={() => {
          window.history.back();
          setAddressModal(false);
        }}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};

export default DiaryEditorContainer;
