"use client";

import { useEffect } from "react";
import { GatheringDetailResponseDto } from "@/entities/gathering/model/gathering";
import { useGatheringStore } from "./gatheringStore";

export const useGatheringViewer = (data: GatheringDetailResponseDto) => {
  const gatheringStore = useGatheringStore();

  useEffect(() => {
    gatheringStore.setGathering({
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
