"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import { DiaryUpdateFormSchema } from "@/lib/zod/schema/DiaryUpdateFormSchema";
import useAuthStore from "@/store/authStore";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import {
  GetDiaryResponseDto,
  UpdateDiaryRequestDto,
  UpdateDiaryResponseDto,
} from "@/types/DiaryDto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      address: diaryEditorStore.address,
      moodLevels: diaryEditorStore.moodLevels,
      contents: diaryEditorStore.contents,
    });

    // If validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      alert(validatedFields.error.issues[0].message);
      return;
    }

    const data: UpdateDiaryRequestDto = {
      title: validatedFields.data.title,
      startDate: validatedFields.data.startDate,
      endDate: validatedFields.data.endDate,
      address: validatedFields.data.address,
      diaryDays: Array.from({ length: diaryEditorStore.days }, (_, index) => ({
        moodLevel: validatedFields.data.moodLevels[index],
        content: validatedFields.data.contents[index],
      })),
    };

    setLoading(true);

    const response = await fetch(`/api/diary/update/${diaryData.diaryId}`, {
      method: "PUT",
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

    const result: UpdateDiaryResponseDto = await response.json();
    router.push(`/diary/${result.id}`);
    router.refresh();
  };

  // 화면에서 벗어났을 때 초기화
  useEffect(() => {
    diaryEditorStore.setDiaryEditor({
      title: diaryData.title,
      startDate: new Date(diaryData.startDate),
      endDate: new Date(diaryData.endDate),
      placeName: "?", // TODO
      address: diaryData.address,
      days:
        (new Date(diaryData.endDate).getTime() -
          new Date(diaryData.startDate).getTime()) /
          (1000 * 60 * 60 * 24) +
        1,
      currentDay: 1,
      moodLevels: diaryData.diaryDays.map((value) => value.moodLevel),
      contents: diaryData.diaryDays.map((value) => value.content),
    });

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
