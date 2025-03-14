"use client";

import DiaryEditor from "@/components/diary/common/DiaryEditor";
import { Diary } from "@/entities/diary";
import { useDiaryUpdateEditor } from "@/hooks/diary/edit/useDiaryUpdateEditor";
import { FormProvider } from "react-hook-form";

interface DiaryUpdateEditorProps {
  diary: Diary;
}

const DiaryUpdateEditor = ({ diary }: DiaryUpdateEditorProps) => {
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
        handleSubmit={handleSubmit}
      />
    </FormProvider>
  );
};

export default DiaryUpdateEditor;
