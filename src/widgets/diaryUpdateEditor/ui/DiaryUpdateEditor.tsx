"use client";

import { Diary } from "@/entities/diary";
import { DiaryEditor } from "@/features/diaryEditor/ui/DiaryEditor";
import { FormProvider } from "react-hook-form";
import { useDiaryUpdateEditor } from "../model/useDiaryUpdateEditor";

interface DiaryUpdateEditorProps {
  diary: Diary;
}

export const DiaryUpdateEditor = ({ diary }: DiaryUpdateEditorProps) => {
  const {
    loading,
    methods,
    dateRangeModalVisible,
    addressModalVisible,
    openDateRangeModal,
    closeDateRangeModal,
    openAddressModal,
    closeAddressModal,
    handleSubmit,
  } = useDiaryUpdateEditor(diary);

  return (
    <FormProvider {...methods}>
      <DiaryEditor
        text="수정"
        loading={loading}
        datePickerModalVisible={dateRangeModalVisible}
        addressModalVisible={addressModalVisible}
        openDateRangeModal={openDateRangeModal}
        closeDateRangeModal={closeDateRangeModal}
        openAddressModal={openAddressModal}
        closeAddressModal={closeAddressModal}
        onSubmit={handleSubmit}
      />
    </FormProvider>
  );
};
