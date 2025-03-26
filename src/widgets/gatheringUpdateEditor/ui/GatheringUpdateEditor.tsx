"use client";

import { FormProvider } from "react-hook-form";
import { GatheringEditor } from "@/features/gatheringEditor";
import { GatheringDetail } from "@/entities/gathering";
import { useGatheringUpdateEditor } from "../model/useGatheringUpdateEditor";

interface GatheringUpdateEditorProps {
  gatheringDetail: GatheringDetail;
}

export const GatheringUpdateEditor = ({
  gatheringDetail,
}: GatheringUpdateEditorProps) => {
  const { loading, methods, handleSubmit } =
    useGatheringUpdateEditor(gatheringDetail);

  return (
    <FormProvider {...methods}>
      <GatheringEditor
        text="수정"
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </FormProvider>
  );
};
