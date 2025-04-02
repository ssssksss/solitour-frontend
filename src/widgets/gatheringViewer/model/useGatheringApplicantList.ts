"use client";

import { useToastifyStore } from "@/shared/model";
import { updateGatheringApplicantStatus } from "../api/gatheringApplicantStatus";
import { useGatheringStore } from "./gatheringStore";
import { useState } from "react";
import { useParams } from "next/navigation";

export const useGatheringApplicantList = () => {
  const {
    gatheringApplicantsResponses,
    currentParticipants,
    setGatheringState,
  } = useGatheringStore();
  const params = useParams<{ id: string }>();
  const [sort, setSort] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { setToastifyState } = useToastifyStore();

  const handleGatheringApplicantStatus = async (
    status: "WAIT" | "CONSENT" | "REFUSE",
    userId: number,
  ) => {
    try {
      await updateGatheringApplicantStatus(status, userId, Number(params.id));
      let _prevStatus = "";
      const temp = gatheringApplicantsResponses.map((i) => {
        if (i.userGatheringResponse.id == userId) {
          _prevStatus = i.gatheringStatus;
          i.gatheringStatus = status;
        }
        return i;
      });
      setGatheringState({
        gatheringApplicantsResponses: temp,
        currentParticipants:
          currentParticipants +
          (_prevStatus == "CONSENT" ? -1 : status == "CONSENT" ? +1 : 0),
      });
    } catch (error) {
      setToastifyState({
        type: "error",
        message: "지원자 정보 업데이트에 실패했습니다.",
      });
    }
  };

  const handleSortButtonClick = (value: string) => {
    setSort(value);
    setIsSortOpen(false);
  };

  return {
    sort,
    isSortOpen,
    setIsSortOpen,
    handleGatheringApplicantStatus,
    handleSortButtonClick,
  };
};
