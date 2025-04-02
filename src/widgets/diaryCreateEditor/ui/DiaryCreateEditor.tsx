"use client";

import { FormProvider } from "react-hook-form";
import { useDiaryCreateEditor } from "../model/useDiaryCreateEditor";
import { DiaryEditor } from "@/features/diaryEditor";

export const DiaryCreateEditor = () => {
  const { loading, methods, handleSubmit } = useDiaryCreateEditor();

  return (
    <FormProvider {...methods}>
      <DiaryEditor text="등록" loading={loading} onSubmit={handleSubmit} />
    </FormProvider>
  );
};
