"use client";

import DiaryEditor from "@/components/diary/common/DiaryEditor";
import { useDiaryUpdateEditor } from "@/hooks/diary/edit/useDiaryUpdateEditor";
import { GetDiaryResponseDto } from "@/entities/diary/model/diary";
import { FormProvider } from "react-hook-form";

interface DiaryUpdateEditorProps {
  diaryData: GetDiaryResponseDto;
}

const DiaryUpdateEditor = ({ diaryData }: DiaryUpdateEditorProps) => {
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
  } = useDiaryUpdateEditor(diaryData);

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
