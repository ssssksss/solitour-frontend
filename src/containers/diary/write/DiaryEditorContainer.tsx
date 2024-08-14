"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import { DiaryCreateFormSchema } from "@/lib/zod/schema/DiaryCreateFormSchema";
import useAuthStore from "@/store/authStore";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { CreateDiaryResponseDto } from "@/types/DiaryDto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DiaryEditorContainer = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const diaryEditorStore = useDiaryEditorStore();
  const [dateRangeModal, setDateRangeModal] = useState<boolean>(false);
  const [placeModal, setPlaceModal] = useState<boolean>(false);

  const onSubmit = async () => {
    // Validate from fields using Zod
    const validatedFields = DiaryCreateFormSchema.safeParse({
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

    const response = await fetch("/api/diary/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: validatedFields.data.userId,
        title: validatedFields.data.title,
        startDate: validatedFields.data.startDate,
        endDate: validatedFields.data.endDate,
        address: validatedFields.data.address,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      alert("일기 작성에 실패하였습니다.");
      throw new Error(response.statusText);
    }

    const result: CreateDiaryResponseDto = await response.json();
    router.push(`/diary/${result.id}`);
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
    <DiaryEditor
      diaryEditorStore={diaryEditorStore}
      dateRangeModal={dateRangeModal}
      placeModal={placeModal}
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
