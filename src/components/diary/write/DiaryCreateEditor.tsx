"use client";

import DiaryEditor from "@/components/diary/common/DiaryEditor";
import { useDiaryCreateEditor } from "@/hooks/diary/write/useDiaryCreateEditor";
import { FormProvider } from "react-hook-form";

const DiaryCreateEditor = () => {
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
        handleSubmit={handleSubmit}
      />
    </FormProvider>
  );
};

export default DiaryCreateEditor;
