"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import sanitizeOption from "@/constants/common/sanitizeOption";
import { FEELING_STATUS } from "@/constants/diary/feelingStatus";
import { DiaryUpdateFormSchema } from "@/lib/zod/schema/DiaryUpdateFormSchema";
import useAuthStore from "@/store/authStore";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { GetDiaryResponseDto, UpdateDiaryRequestDto } from "@/types/DiaryDto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { parse } from "node-html-parser";

interface Props {
  diaryData: GetDiaryResponseDto;
}

const DiaryEditorContainer = ({ diaryData }: Props) => {
  const router = useRouter();
  const authStore = useAuthStore();
  const diaryEditorStore = useDiaryEditorStore();
  const [dateRangeModal, setDateRangeModal] = useState<boolean>(false);
  const [placeModal, setPlaceModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    // Validate from fields using Zod
    const validatedFields = DiaryUpdateFormSchema.safeParse({
      userId: authStore.id,
      title: diaryEditorStore.title,
      startDate: diaryEditorStore.startDate,
      endDate: diaryEditorStore.endDate,
      placeName: diaryEditorStore.placeName,
      address: diaryEditorStore.address,
      image:
        parse(diaryEditorStore.contents[0])
          .querySelector("img")
          ?.getAttribute("src") ?? "",
      moodLevels: diaryEditorStore.moodLevels,
      contents: diaryEditorStore.contents.map((content) =>
        sanitizeHtml(content, sanitizeOption),
      ),
    });

    // If validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      alert(validatedFields.error.issues[0].message);
      return;
    }

    const data: UpdateDiaryRequestDto = {
      title: validatedFields.data.title,
      titleImage: validatedFields.data.image,
      startDatetime: validatedFields.data.startDate,
      endDatetime: validatedFields.data.endDate,
      diaryDayRequests: Array.from(
        { length: diaryEditorStore.days },
        (_, index) => ({
          content: validatedFields.data.contents[index],
          feelingStatus: FEELING_STATUS[validatedFields.data.moodLevels[index]],
          place: validatedFields.data.address[index],
        }),
      ),
    };

    setLoading(true);

    const response = await fetch(
      `/api/diary?diaryId=${diaryData.diaryContentResponse.diaryId}`,
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

    const diaryId = await response.text();
    router.push(`/diary/${diaryId}`);
    router.refresh();
  };

  useEffect(() => {
    diaryEditorStore.setDiaryEditor({
      title: diaryData.diaryContentResponse.title,
      startDate: new Date(
        new Date(diaryData.diaryContentResponse.startDatetime).getTime() +
          1000 * 60 * 60 * 24,
      ),
      endDate: new Date(
        new Date(diaryData.diaryContentResponse.endDatetime).getTime() +
          1000 * 60 * 60 * 24,
      ),
      placeName:
        diaryData.diaryContentResponse.diaryDayContentResponses.diaryDayContentDetail.map(
          (value) => value.place,
        ),
      address:
        diaryData.diaryContentResponse.diaryDayContentResponses.diaryDayContentDetail.map(
          (value) => value.place,
        ),
      days: diaryData.diaryContentResponse.diaryDayContentResponses
        .diaryDayContentDetail.length,
      currentDay: 1,
      moodLevels:
        diaryData.diaryContentResponse.diaryDayContentResponses.diaryDayContentDetail.map(
          (value) => Number(FEELING_STATUS[value.feelingStatus]),
        ),
      contents:
        diaryData.diaryContentResponse.diaryDayContentResponses.diaryDayContentDetail.map(
          (value) => value.content,
        ),
    });

    // 화면에서 벗어났을 때 초기화
    return () => {
      diaryEditorStore.initialize();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DiaryEditor
      text="수정"
      diaryEditorStore={diaryEditorStore}
      dateRangeModal={dateRangeModal}
      placeModal={placeModal}
      loading={loading}
      showDateRangeModal={() => setDateRangeModal(true)}
      closeDateRangeModal={() => setDateRangeModal(false)}
      showPlaceModal={() => setPlaceModal(true)}
      closePlaceModal={() => setPlaceModal(false)}
      setCurrentDay={(day: number) =>
        diaryEditorStore.setDiaryEditor({ currentDay: day })
      }
      onSubmit={onSubmit}
    />
  );
};

export default DiaryEditorContainer;
