"use client";

import { FormProvider } from "react-hook-form";
import { useDiaryCreateEditor } from "../model/useDiaryCreateEditor";
import { DiaryEditor } from "@/features/diary";

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
