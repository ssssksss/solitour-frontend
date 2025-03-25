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
  const { methods, loading, handleSubmit } = useInformationUpdateEditor(
    informationId,
    data,
  );

  return (
    <FormProvider {...methods}>
      <InformationEditor
        text="수정"
        loading={loading}
        onSubmit={handleSubmit}
      />
    </FormProvider>
  );
};
