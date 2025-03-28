"use client";

import { useEffect } from "react";
import { useGatheringStore } from "./gatheringStore";
import { GatheringDetail } from "@/entities/gathering";

export const useGatheringViewer = (data: GatheringDetail) => {
  const gatheringStore = useGatheringStore();

  useEffect(() => {
    gatheringStore.setGatheringState({
      currentParticipants: data.nowPersonCount,
      gatheringApplicantsResponses: data.gatheringApplicantsResponses,
      isFinish: data.isFinish,
      deadline: data.deadline,
      personCount: data.personCount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentParticipants: gatheringStore.currentParticipants,
  };
};
