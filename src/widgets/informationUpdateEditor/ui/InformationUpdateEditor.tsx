"use client";

import { FormProvider } from "react-hook-form";
import { InformationDetailResponse } from "@/entities/information";
import { InformationEditor } from "@/features/informationEditor";
import { useInformationUpdateEditor } from "../model/useInformationUpdateEditor";

interface InformationUpdateEditorProps {
  informationId: number;
  data: InformationDetailResponse;
}

export const InformationUpdateEditor = ({
  informationId,
  data,
}: InformationUpdateEditorProps) => {
  const {
    methods,
    loading,
    categoryModalVisible,
    inputTagRef,
    inputTipRef,
    openCategoryModal,
    closeCategoryModal,
    handleHashTagChange,
    handleTipChange,
    handleSubmit,
  } = useInformationUpdateEditor(informationId, data);

  return (
    <FormProvider {...methods}>
      <InformationEditor
        text="수정"
        loading={loading}
        categoryModalVisible={categoryModalVisible}
        inputTagRef={inputTagRef}
        inputTipRef={inputTipRef}
        openCategoryModal={openCategoryModal}
        closeCategoryModal={closeCategoryModal}
        handleHashTagChange={handleHashTagChange}
        handleTipChange={handleTipChange}
        handleSubmit={handleSubmit}
      />
    </FormProvider>
  );
};
