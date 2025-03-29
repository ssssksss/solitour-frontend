"use client";

import { Modal } from "@/shared/ui/modal";
import { useUserStore } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks";
import { ConfirmModal } from "@/shared/ui/modal";
import { GatheringStatusChangeModal } from "./GatheringStatusChangeModal";
import { GatheringChattingLinkCheckModal } from "./GatheringChattingLinkCheckModal";
import { useGatheringSupportManagement } from "../model/useGatheringSupportManagement";
import { useGatheringStore } from "../model/gatheringStore";

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

export const GatheringSupportManagement = ({
  postUserId,
  initialGatheringStatus,
  initialIsFinished,
  openChattingUrl,
  allowedGender,
  allowedAgeRange,
}: GatheringSupportManagementProps) => {
  const userStore = useUserStore();
  const gatheringStore = useGatheringStore();
  const modalState = useModal();
  const modalState1 = useModal();
  const modalState2 = useModal();
  const {
    isFinish,
    gatheringStatus,
    handleApplyButtonClick,
    handleCancelButtonClick,
    handleReopenButtonClick,
  } = useGatheringSupportManagement(initialGatheringStatus, initialIsFinished);

  if (userStore.id === 0)
    return (
      <div className="flex animate-pulse gap-2 max-[960px]:flex-col min-[960px]:flex-row">
        <div className="h-12.5 w-30 rounded-[2.125rem] bg-gray-300" />
        <div className="h-12.5 w-30 rounded-[2.125rem] bg-gray-300" />
      </div>
    );

  if (postUserId === userStore.id && userStore.id > 0) {
    return (
      <div className="flex gap-2 max-[960px]:flex-col min-[960px]:flex-row">
        <Modal isOpen={modalState.isOpen} closeModal={modalState.closeModal}>
          <GatheringStatusChangeModal
            isFinish={isFinish}
            closeModal={modalState.closeModal}
          />
        </Modal>
        <Modal isOpen={modalState1.isOpen} closeModal={modalState1.closeModal}>
          <GatheringChattingLinkCheckModal
            openChattingUrl={openChattingUrl}
            closeModal={modalState1.closeModal}
          />
        </Modal>
        <button
          className="outline-gray3 h-12.5 w-30 rounded-[2.125rem] text-sm outline -outline-offset-1"
          onClick={() => modalState1.openModal()}
        >
          채팅방 가기
        </button>
        <button
          onClick={() =>
            isFinish ? handleReopenButtonClick() : modalState.openModal()
          }
          className={`outline-gray3 h-12.5 w-30 rounded-[2.125rem] text-sm outline -outline-offset-1 ${isFinish ? "bg-[#EE4C4A] text-white" : ""}`}
        >
          {isFinish ? "모임 마감" : "모임 마감하기"}
        </button>
      </div>
    );
  }
  if (postUserId !== userStore.id && userStore.id > 0) {
    return (
      <div className="flex gap-2 max-[960px]:flex-col min-[960px]:flex-row">
        <Modal isOpen={modalState1.isOpen} closeModal={modalState1.closeModal}>
          <GatheringChattingLinkCheckModal
            openChattingUrl={openChattingUrl}
            closeModal={modalState1.closeModal}
          />
        </Modal>
        <Modal isOpen={modalState2.isOpen} closeModal={modalState2.closeModal}>
          <ConfirmModal
            onConfirmClick={() => {
              handleCancelButtonClick();
              modalState2.closeModal();
            }}
            onCancelClick={() => modalState2.closeModal()}
            mainMessage={["모임 신청을 취소하시겠습니까?"]}
            loading={false}
          />
        </Modal>
        {
          <button
            className="outline-gray3 disabled:bg-gray3 h-12.5 w-30 rounded-[2.125rem] text-sm outline -outline-offset-1"
            onClick={() => modalState1.openModal()}
            disabled={gatheringStatus != "CONSENT"}
          >
            채팅방 열기
          </button>
        }
        {gatheringStatus == "REFUSE" && (
          <div className="flex h-12.5 w-30 items-center justify-center rounded-[2.125rem] bg-[#EE4C4A] text-sm text-white">
            신청 거부
          </div>
        )}
        {gatheringStatus == "WAIT" && (
          <button
            className="bg-gray2 flex h-12.5 w-30 items-center justify-center rounded-[2.125rem] text-sm text-white"
            onClick={handleCancelButtonClick}
          >
            모임 신청중
          </button>
        )}
        {gatheringStatus == "CONSENT" && (
          <button
            className="bg-main flex h-12.5 w-30 items-center justify-center rounded-[2.125rem] text-sm text-white outline -outline-offset-1 outline-[#D9D9D9]"
            onClick={() => modalState2.openModal()}
          >
            모임 승인 완료
          </button>
        )}
        {gatheringStatus == null && (
          <button
            className={[
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
                  "bg-gray3"),
              "flex h-12.5 w-30 items-center justify-center rounded-[2.125rem] text-sm outline -outline-offset-1 outline-[#D9D9D9]",
            ].join(" ")}
            onClick={handleApplyButtonClick}
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
