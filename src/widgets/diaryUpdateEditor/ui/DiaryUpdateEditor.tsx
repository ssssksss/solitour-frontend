"use client";

import { Diary } from "@/entities/diary";
import { DiaryEditor } from "@/features/diaryEditor/ui/DiaryEditor";
import { FormProvider } from "react-hook-form";
import { useDiaryUpdateEditor } from "../model/useDiaryUpdateEditor";

interface DiaryUpdateEditorProps {
  diary: Diary;
}

export const DiaryUpdateEditor = ({ diary }: DiaryUpdateEditorProps) => {
  const { loading, methods, handleSubmit } = useDiaryUpdateEditor(diary);

  return (
    <FormProvider {...methods}>
      <DiaryEditor text="수정" loading={loading} onSubmit={handleSubmit} />
    </FormProvider>
  );
};
