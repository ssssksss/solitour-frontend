"use client";

import { InformationEditor } from "@/features/informationEditor";
import { FormProvider } from "react-hook-form";
import { useInformationCreateEditor } from "../model/useInformationCreateEditor";

export const InformationCreateEditor = () => {
  const {
    methods,
    loading,
    inputTagRef,
    inputTipRef,
    handleHashTagChange,
    handleTipChange,
    handleSubmit,
  } = useInformationCreateEditor();

  return (
    <FormProvider {...methods}>
      <InformationEditor
        text="등록"
        loading={loading}
        inputTagRef={inputTagRef}
        inputTipRef={inputTipRef}
        handleHashTagChange={handleHashTagChange}
        handleTipChange={handleTipChange}
        handleSubmit={handleSubmit}
      />
    </FormProvider>
  );
};
