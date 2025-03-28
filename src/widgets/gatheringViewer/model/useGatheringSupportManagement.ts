"use client";

import { useToastifyStore } from "@/shared/model";
import { reopenGathering } from "../api/gatheringStatus";
import { useGatheringStore } from "./gatheringStore";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  applyGathering,
  cancelGathering,
} from "../api/gatheringApplicantStatus";

export const useGatheringSupportManagement = (
  initialGatheringStatus: string,
  initialIsFinished: boolean,
) => {
  const { currentParticipants, setGatheringState } = useGatheringStore();
  const { setToastifyState } = useToastifyStore();
  const params = useParams<{ id: string }>();
  const [gatheringStatus, setGatheringStatus] = useState<string | null>(
    initialGatheringStatus,
  );
  const [isFinish, setIsFinish] = useState(initialIsFinished);

  // 모임 신청하기
  const handleApplyButtonClick = async () => {
    try {
      await applyGathering(Number(params.id));
      setGatheringStatus("WAIT");
      setToastifyState({
        type: "success",
        message: "모임을 신청했습니다.",
      });
    } catch (error) {
      setToastifyState({
        type: "error",
        message: "모임을 신청에 실패했습니다.",
      });
    }
  };

  // 모임 신청 취소 및 모임 신청 이후 취소, 승인 이후에도 취소 가능
  const handleCancelButtonClick = async () => {
    try {
      await cancelGathering(Number(params.id));
      setGatheringStatus(null);
      if (gatheringStatus === "CONSENT") {
        setGatheringState({ currentParticipants: currentParticipants - 1 });
      }
      setToastifyState({
        type: "warning",
        message: "모임을 취소했습니다.",
      });
    } catch (error) {
      setToastifyState({
        type: "error",
        message: "모임 취소에 실패했습니다.",
      });
    }
  };

  const handleReopenButtonClick = async () => {
    try {
      // 모임 다시 활성화하기
      await reopenGathering(Number(params.id));

      setIsFinish(false);
      setGatheringState({
        isFinish: false,
      });
      setToastifyState({
        type: "success",
        message: "모임 활성화에 성공했습니다.",
      });
    } catch (error) {
      setToastifyState({
        type: "error",
        message: "모임 활성화에 실패했습니다.",
      });
    }
  };

  return {
    isFinish,
    gatheringStatus,
    handleApplyButtonClick,
    handleCancelButtonClick,
    handleReopenButtonClick,
  };
};
