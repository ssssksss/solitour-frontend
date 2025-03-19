"use client";

import { FormProvider } from "react-hook-form";
import { useDiaryCreateEditor } from "../model/useDiaryCreateEditor";
import { DiaryEditor } from "@/features/diaryEditor";

export const DiaryCreateEditor = () => {
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
  } = useDiaryCreateEditor();

  return (
    <FormProvider {...methods}>
      <DiaryEditor
        text="등록"
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
