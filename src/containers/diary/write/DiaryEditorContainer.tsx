"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import sanitizeOption from "@/constants/common/sanitizeOption";
import { FEELING_STATUS } from "@/constants/diary/feelingStatus";
import { DiaryCreateFormSchema } from "@/lib/zod/schema/DiaryCreateFormSchema";
import { CreateDiaryRequestDto } from "@/types/DiaryDto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import sanitizeHtml from "sanitize-html";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import parse from "node-html-parser";
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import useModalBackHandler from "@/hooks/useModalBackHandler";

const DiaryEditorContainer = () => {
  const router = useRouter();
  const [datePickerModal, setDatePickerModal] = useState<boolean>(false);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  usePreventBodyScroll(datePickerModal);
  usePreventBodyScroll(addressModal);
  useModalBackHandler(datePickerModal, () => setDatePickerModal(false));
  useModalBackHandler(addressModal, () => setAddressModal(false));

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

  return (
    <FormProvider {...methods}>
      <DiaryEditor
        text="등록"
        datePickerModal={datePickerModal}
        addressModal={addressModal}
        loading={loading}
        showDateRangeModal={() => setDatePickerModal(true)}
        closeDateRangeModal={() => {
          window.history.back();
          setDatePickerModal(false);
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
