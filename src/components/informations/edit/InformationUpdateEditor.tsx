"use client";

import { useInformationUpdateEditor } from "@/hooks/information/edit/useInformationUpdateEditor";
import { FormProvider } from "react-hook-form";
import { InformationDetailResponse } from "@/entities/information";
import { InformationEditor } from "@/features/informationEditor";

interface InformationUpdateEditorProps {
  informationId: number;
  data: InformationDetailResponse;
}

const InformationUpdateEditor = ({
  informationId,
  data,
}: InformationUpdateEditorProps) => {
  const {
    text,
    methods,
    loading,
    locationModalVisible,
    categoryModalVisible,
    inputTagRef,
    inputTipRef,
    openLocationModal,
    closeLocationModal,
    openCategoryModal,
    closeCategoryModal,
    handleHashTagChange,
    handleTipChange,
    handleSubmit,
  } = useInformationUpdateEditor(informationId, data);

  return (
    <FormProvider {...methods}>
      <InformationEditor
        text={text}
        loading={loading}
        locationModalVisible={locationModalVisible}
        categoryModalVisible={categoryModalVisible}
        inputTagRef={inputTagRef}
        inputTipRef={inputTipRef}
        openLocationModal={openLocationModal}
        closeLocationModal={closeLocationModal}
        openCategoryModal={openCategoryModal}
        closeCategoryModal={closeCategoryModal}
        handleHashTagChange={handleHashTagChange}
        handleTipChange={handleTipChange}
        handleSubmit={handleSubmit}
      />
    </FormProvider>
  );
};

export default InformationUpdateEditor;
