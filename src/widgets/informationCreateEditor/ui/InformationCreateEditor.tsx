"use client";

import { InformationEditor } from "@/features/informationEditor";
import { FormProvider } from "react-hook-form";
import { useInformationCreateEditor } from "../model/useInformationCreateEditor";

export const InformationCreateEditor = () => {
  const { methods, loading, handleSubmit } = useInformationCreateEditor();

  return (
    <FormProvider {...methods}>
      <InformationEditor
        text="등록"
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </FormProvider>
  );
};
