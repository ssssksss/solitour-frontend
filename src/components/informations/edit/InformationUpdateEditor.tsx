"use client";

import { useInformationUpdateEditor } from "@/hooks/information/useInformationUpdateEditor";
import { InformationDetailDto } from "@/types/InformationDto";
import { FormProvider } from "react-hook-form";
import InformationEditor from "../common/InformationEditor";

interface InformationUpdateEditorProps {
  informationId: number;
  data: InformationDetailDto;
}

const InformationUpdateEditor = ({
  informationId,
  data,
}: InformationUpdateEditorProps) => {
  const {
    text,
    methods,
    imagesHook,
    loading,
    locationModalVisible,
    categoryModalVisible,
    inputTagRef,
    inputTipRef,
    editorStore,
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
        imagesHook={imagesHook}
        loading={loading}
        locationModalVisible={locationModalVisible}
        categoryModalVisible={categoryModalVisible}
        inputTagRef={inputTagRef}
        inputTipRef={inputTipRef}
        editorStore={editorStore}
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
