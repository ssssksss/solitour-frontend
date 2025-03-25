"use client";

import { InformationEditor } from "@/features/informationEditor";
import { FormProvider } from "react-hook-form";
import { useInformationCreateEditor } from "../model/useInformationCreateEditor";

export const InformationCreateEditor = () => {
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
  } = useInformationCreateEditor();

  return (
    <FormProvider {...methods}>
      <InformationEditor
        text="등록"
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
