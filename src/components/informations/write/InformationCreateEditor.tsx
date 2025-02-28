"use client";

import { useInformationCreateEditor } from "@/hooks/information/write/useInformationCreateEditor";
import { FormProvider } from "react-hook-form";
import InformationEditor from "../common/InformationEditor";

const InformationCreateEditor = () => {
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
  } = useInformationCreateEditor();

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

export default InformationCreateEditor;
