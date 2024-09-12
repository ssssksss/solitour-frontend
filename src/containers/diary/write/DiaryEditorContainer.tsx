"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import sanitizeOption from "@/constants/common/sanitizeOption";
import { FEELING_STATUS } from "@/constants/diary/feelingStatus";
import { DiaryCreateFormSchema } from "@/lib/zod/schema/DiaryCreateFormSchema";
import useAuthStore from "@/store/authStore";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { CreateDiaryRequestDto } from "@/types/DiaryDto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import parse from "node-html-parser";

const DiaryEditorContainer = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const diaryEditorStore = useDiaryEditorStore();
  const [dateRangeModal, setDateRangeModal] = useState<boolean>(false);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<{
    userId: number;
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    address: string[];
    image: string;
    moodLevels: number[];
    contents: string[];
  }>({
    resolver: zodResolver(DiaryCreateFormSchema),
    defaultValues: {
      userId: authStore.id,
      title: "",
      startDate: null,
      endDate: null,
      address: [""],
      image: "",
      moodLevels: [],
      contents: [],
    },
    mode: "onChange",
  });

  const onSubmit = async () => {
    const imageUrl =
      parse(methods.getValues("contents")[0])
        .querySelector("img")
        ?.getAttribute("src") ?? "";

    const contentImagesUrl = methods.getValues("contents").map((content) =>
      parse(content)
        .querySelectorAll("img")
        .filter((img) => img.getAttribute("src") !== imageUrl)
        .map((img) => img.getAttribute("src") ?? "")
        .join(","),
    );

    if (imageUrl === "") {
      alert("Day1에 최소 1장의 이미지를 등록해 주세요.");
      return;
    }

    methods.setValue("image", imageUrl);

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
      diaryDayRequests: Array.from(
        { length: diaryEditorStore.days },
        (_, index) => ({
          content: sanitizeHtml(contents[index], sanitizeOption),
          feelingStatus: FEELING_STATUS[moodLevels[index]],
          diaryDayContentImages: contentImagesUrl[index],
          place: address[index],
        }),
      ),
    };

    setLoading(true);

    const response = await fetch("/api/diary", {
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

  // 화면에서 벗어났을 때 초기화
  useEffect(() => {
    return () => {
      diaryEditorStore.initialize();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <DiaryEditor
        text="등록"
        diaryEditorStore={diaryEditorStore}
        dateRangeModal={dateRangeModal}
        addressModal={addressModal}
        loading={loading}
        showDateRangeModal={() => setDateRangeModal(true)}
        closeDateRangeModal={() => setDateRangeModal(false)}
        showAddressModal={() => setAddressModal(true)}
        closeAddressModal={() => setAddressModal(false)}
        setCurrentDay={(day: number) =>
          diaryEditorStore.setDiaryEditor({ currentDay: day })
        }
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};

export default DiaryEditorContainer;
