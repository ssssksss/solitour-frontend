"use client";

import parse from "node-html-parser";
import sanitizeHtml from "sanitize-html";
import {
  Diary,
  DiaryUpdateRequest,
  FEELING_STATUS,
  updateDiary,
} from "@/entities/diary";
import { DiaryForm, DiaryFormSchema } from "@/features/diaryEditor";
import { SANITIZE_OPTION } from "@/shared/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToastifyStore } from "@/shared/model";

export const useDiaryUpdateEditor = (diary: Diary) => {
  const router = useRouter();
  const { setToastifyState } = useToastifyStore();
  const [loading, setLoading] = useState(false);
  const [originalThumbnailUrl, setOriginalThumbnailUrl] = useState("");
  const [originalContentUrl, setOriginalContentUrl] = useState<string[]>([]);
  const methods = useForm<DiaryForm>({
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

    try {
      setLoading(true);
      await updateDiary(diary.diaryId, data);
      router.replace(`/diary/${diary.diaryId}`);
    } catch (error) {
      setToastifyState({ type: "error", message: "일기 수정에 실패했습니다." });
    } finally {
      setLoading(false);
    }
  };

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

  return { loading, methods, handleSubmit };
};
