"use client";

import { useFormContext } from "react-hook-form";
import { GatheringForm } from "./gatheringForm";
import { useState } from "react";

export const useGatheringCategoryListModal = (closeModal: () => void) => {
  const formContext = useFormContext<GatheringForm>();
  const [mainCategoryId, setMainCategoryId] = useState(
    formContext.getValues("gatheringCategoryId") || 0,
  );

  const handleSubmit = () => {
    formContext.setValue("gatheringCategoryId", mainCategoryId);
    formContext.trigger("gatheringCategoryId");
    closeModal();
  };

  return { mainCategoryId, setMainCategoryId, handleSubmit };
};
