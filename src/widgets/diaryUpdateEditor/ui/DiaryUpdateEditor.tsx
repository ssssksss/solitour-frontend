"use client";

import { Diary } from "@/entities/diary";
import { DiaryEditor } from "@/features/diary/ui/DiaryEditor";
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
        datePickerModal={dateRangeModalVisible}
        addressModal={addressModalVisible}
        loading={loading}
        openDateRangeModal={openDateRangeModal}
        closeDateRangeModal={closeDateRangeModal}
        openAddressModal={openAddressModal}
        closeAddressModal={closeAddressModal}
        onSubmit={handleSubmit}
      />
    </FormProvider>
  );
};
