"use client";

import { Modal } from "@/components/common/modal/Modal";
import GatheringStatusChangeModal from "@/components/gathering/read/detail/GatheringStatusChangeModal";
import GatheringChattingLinkCheckModal from "./GatheringChattingLinkCheckModal";
import { useState } from "react";
import useGatheringStore from "@/stores/gatheringStore";
import { useParams } from "next/navigation";
import { fetchWithAuth } from "@/shared/api";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import { useUserStore } from "@/entities/user";
import { useModalState } from "@/shared/lib/hooks";
import { useToastifyStore } from "@/shared/model/toastifyStore";

interface GatheringSupportManagementProps {
  postUserId: number;
  initialGatheringStatus: string;
  initialIsFinished: boolean;
  openChattingUrl: string;
  allowedGender: string;
  allowedAgeRange: {
    startAge: number;
    endAge: number;
  };
}

const GatheringSupportManagement = ({
  postUserId,
  initialGatheringStatus,
  initialIsFinished,
  openChattingUrl,
  allowedGender,
  allowedAgeRange,
}: GatheringSupportManagementProps) => {
  const userStore = useUserStore();
  const gatheringStore = useGatheringStore();
  const toastifyStore = useToastifyStore();
  const params = useParams();
  const [gatheringStatus, setGatheringStatus] = useState<string | null>(
    initialGatheringStatus,
  );
  const [isFinish, setIsFinish] = useState(initialIsFinished);
  const modalState = useModalState();
  const modalState1 = useModalState();
  const modalState2 = useModalState();

  // 모임 신청하기
  const applyGathering = async () => {
    const response = await fetchWithAuth(
      `/api/gathering/apply?id=${params.id}`,
      {
        method: "POST",
      },
    );

    if (response.ok) {
      setGatheringStatus("WAIT");
      toastifyStore.setToastifyState({
        type: "success",
        message: "모임을 신청했습니다.",
      });
    }
    if (!response.ok) {
      toastifyStore.setToastifyState({
        type: "error",
        message: "모임을 신청에 실패했습니다.",
      });
    }
  };

  // 모임 신청 취소 및 모임 신청 이후 취소, 승인 이후에도 취소 가능
  const cancelGathering = async () => {
    const res = await fetchWithAuth(`/api/gathering/apply?id=${params.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setGatheringStatus(null);
      if (gatheringStatus == "CONSENT") {
        gatheringStore.setGathering({
          currentParticipants: gatheringStore.currentParticipants - 1,
        });
      }
      toastifyStore.setToastifyState({
        type: "warning",
        message: "모임을 취소했습니다.",
      });
    }
    if (!res.ok) {
      toastifyStore.setToastifyState({
        type: "error",
        message: "모임을 취소에 실패했습니다.",
      });
    }
  };

  const reOpenGathering = async () => {
    // 모임 다시 활성화하기
    const response = await fetchWithAuth(
      `/api/gathering/finish?isFinish=true&id=${params.id}`,
      {
        method: "PUT",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      toastifyStore.setToastifyState({
        type: "error",
        message: "모임 활성화를 실패하였습니다.",
      });
      return;
    }

    setIsFinish(false);
    gatheringStore.setGathering({
      isFinish: false,
    });
    toastifyStore.setToastifyState({
      type: "success",
      message: "모임이 활성화 되었습니다.",
    });
  };

  if (userStore.id == 0)
    return (
      <div className="flex animate-pulse gap-2 max-[960px]:flex-col min-[960px]:flex-row">
        <div className="h-[3.125rem] w-[7.5rem] rounded-[2.125rem] bg-gray-300" />
        <div className="h-[3.125rem] w-[7.5rem] rounded-[2.125rem] bg-gray-300" />
      </div>
    );

  if (postUserId == userStore.id && userStore.id > 0) {
    return (
      <div className="flex gap-2 max-[960px]:flex-col min-[960px]:flex-row">
        <Modal modalState={modalState}>
          <GatheringStatusChangeModal isFinish={isFinish} />
        </Modal>
        <Modal modalState={modalState1}>
          <GatheringChattingLinkCheckModal openChattingUrl={openChattingUrl} />
        </Modal>
        <button
          className="outline-gray3 h-[3.125rem] w-[7.5rem] rounded-[2.125rem] text-sm outline -outline-offset-1"
          onClick={() => modalState1.openModal()}
        >
          채팅방 가기
        </button>
        <button
          onClick={() => {
            isFinish ? reOpenGathering() : modalState.openModal();
          }}
          className={`outline-gray3 h-[3.125rem] w-[7.5rem] rounded-[2.125rem] text-sm outline -outline-offset-1 ${isFinish ? "bg-[#EE4C4A] text-white" : ""}`}
        >
          {isFinish ? "모임 마감" : "모임 마감하기"}
        </button>
      </div>
    );
  }
  if (postUserId != userStore.id && userStore.id > 0) {
    return (
      <div className={"flex gap-2 max-[960px]:flex-col min-[960px]:flex-row"}>
        <Modal modalState={modalState1}>
          <GatheringChattingLinkCheckModal openChattingUrl={openChattingUrl} />
        </Modal>
        <Modal modalState={modalState2}>
          <ConfirmModal
            onConfirmClick={() => {
              cancelGathering();
              modalState2.closeModal();
            }}
            onCancelClick={() => modalState2.closeModal()}
            mainMessage={["모임 신청을 취소하시겠습니까?"]}
            loading={false}
          />
        </Modal>
        {
          <button
            disabled={gatheringStatus != "CONSENT"}
            className="outline-gray3 disabled:bg-gray3 h-[3.125rem] w-[7.5rem] rounded-[2.125rem] text-sm outline -outline-offset-1"
            onClick={() => modalState1.openModal()}
          >
            채팅방 열기
          </button>
        }
        {gatheringStatus == "REFUSE" && (
          <div className="flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] bg-[#EE4C4A] text-sm text-white">
            신청 거부
          </div>
        )}
        {gatheringStatus == "WAIT" && (
          <button
            onClick={cancelGathering}
            className="bg-gray2 flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] text-sm text-white"
          >
            모임 신청중
          </button>
        )}
        {gatheringStatus == "CONSENT" && (
          <button
            onClick={() => modalState2.openModal()}
            className="bg-main flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] text-sm text-white outline -outline-offset-1 outline-[#D9D9D9]"
          >
            모임 승인 완료
          </button>
        )}
        {gatheringStatus == null && (
          <button
            onClick={applyGathering}
            className={`${
              gatheringStore.personCount ==
                gatheringStore.currentParticipants ||
              !(
                allowedGender == "ALL" ||
                userStore?.sex?.toUpperCase() == allowedGender
              ) ||
              (!(
                userStore.age !== null &&
                userStore.age <= allowedAgeRange.startAge &&
                userStore.age >= allowedAgeRange.endAge
              ) &&
                "bg-gray3")
            } flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] text-sm outline -outline-offset-1 outline-[#D9D9D9]`}
            disabled={
              gatheringStore.personCount ==
                gatheringStore.currentParticipants ||
              !(
                allowedGender == "ALL" ||
                userStore.sex?.toUpperCase() == allowedGender
              ) ||
              !(
                userStore.age !== null &&
                userStore.age <= allowedAgeRange.startAge &&
                userStore.age >= allowedAgeRange.endAge
              )
            }
          >
            {gatheringStore.personCount == gatheringStore.currentParticipants
              ? "정원 초과"
              : !(allowedGender == "ALL") ||
                  userStore.sex?.toUpperCase() == allowedGender
                ? "성별 제한"
                : !allowedAgeRange
                  ? "나이 제한"
                  : "모임 신청하기"}
          </button>
        )}
      </div>
    );
  }
  return <></>;
};
export default GatheringSupportManagement;
