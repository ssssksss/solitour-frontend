"use client";

import parse from "node-html-parser";
import sanitizeHtml from "sanitize-html";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createDiary,
  DiaryCreateRequest,
  FEELING_STATUS,
} from "@/entities/diary";
import { SANITIZE_OPTION } from "@/shared/config";
import { DiaryFormSchema } from "@/features/diaryEditor";

export const useDiaryCreateEditor = () => {
  const router = useRouter();
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

    const data: DiaryCreateRequest = {
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

    const response = await createDiary(data);

    if (!response.ok) {
      alert("일기 작성에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    const diaryId = await response.text();
    router.push(`/diary/${diaryId}`);
    router.refresh();
  };

  return { loading, methods, handleSubmit };
};
