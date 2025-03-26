"use client";

import { FormProvider } from "react-hook-form";
import { GatheringEditor } from "@/features/gatheringEditor";
import { useGatheringCreateEditor } from "../model/useGatheringCreateEditor";

export const GatheringCreateEditor = () => {
  const { loading, methods, handleSubmit } = useGatheringCreateEditor();

  return (
    <FormProvider {...methods}>
      <GatheringEditor
        text="등록"
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </FormProvider>
  );
};
