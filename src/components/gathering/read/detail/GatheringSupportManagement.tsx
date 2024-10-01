import { Modal } from "@/components/common/modal/Modal";
import GatheringStatusChangeModalContainer from "@/containers/gathering/read/detail/GatheringStatusChangeModalContainer";
import { ModalState } from "@/types/ModalState";
import ConfirmModal from "./../../../common/modal/ConfirmModal";
import GatheringChattingLinkCheckModal from "./GatheringChattingLinkCheckModal";

interface IGatheringSupportManagement {
  postUserId: number;
  userId: number;
  applyGathering: () => void;
  cancelGathering: () => void;
  gatheringStatus: string | null;
  modalState: ModalState;
  modalState1: ModalState;
  modalState2: ModalState;
  isFinish: boolean;
  openChattingUrl: string;
  reOpenGathering: () => void;
  isFullParticipants: boolean;
  isAllowedGender: boolean;
  isAllowedAgeRange: boolean;
}
const GatheringSupportManagement = ({
  postUserId,
  userId,
  applyGathering,
  cancelGathering,
  gatheringStatus,
  modalState,
  modalState1,
  modalState2,
  isFinish,
  openChattingUrl,
  reOpenGathering,
  isFullParticipants,
  isAllowedGender,
  isAllowedAgeRange,
}: IGatheringSupportManagement) => {
  if (postUserId == userId && userId > 0) {
    return (
      <div className={"flex gap-2 max-[960px]:flex-col min-[960px]:flex-row"}>
        <Modal
          modalState={modalState}
        >
          <GatheringStatusChangeModalContainer
            isFinish={isFinish}
          />
        </Modal>
        <Modal
          modalState={modalState1}
        >
          <GatheringChattingLinkCheckModal
            openChattingUrl={openChattingUrl}
          />
        </Modal>
        <button
          className={
            "h-[3.125rem] w-[7.5rem] rounded-[2.125rem] text-sm outline outline-[1px] outline-offset-[-1px] outline-gray3"
          }
          onClick={() => modalState1.openModal()}
        >
          채팅방 가기
        </button>
        <button
          onClick={() => {
            isFinish ? reOpenGathering() : modalState.openModal();
          }}
          className={`h-[3.125rem] w-[7.5rem] rounded-[2.125rem] text-sm outline outline-[1px] outline-offset-[-1px] outline-gray3 ${isFinish ? "bg-[#EE4C4A] text-white" : ""}`}
        >
          {isFinish ? "모임 마감" : "모임 마감하기"}
        </button>
      </div>
    );
  }
  if (postUserId != userId && userId > 0) {
    return (
      <div className={"flex gap-2 max-[960px]:flex-col min-[960px]:flex-row"}>
        <Modal
          modalState={modalState1}
        >
          <GatheringChattingLinkCheckModal
            openChattingUrl={openChattingUrl}
          />
        </Modal>
        <Modal
          modalState={modalState2}
        >
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
            className={
              "h-[3.125rem] w-[7.5rem] rounded-[2.125rem] text-sm outline outline-[1px] outline-offset-[-1px] outline-gray3 disabled:bg-gray3"
            }
            onClick={() => modalState1.openModal()}
          >
            채팅방 열기
          </button>
        }
        {gatheringStatus == "REFUSE" && (
          <div
            className={
              "flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] bg-[#EE4C4A] text-sm text-white"
            }
          >
            신청 거부
          </div>
        )}
        {gatheringStatus == "WAIT" && (
          <button
            onClick={cancelGathering}
            className={
              "flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] bg-gray2 text-sm text-white"
            }
          >
            모임 신청중
          </button>
        )}
        {gatheringStatus == "CONSENT" && (
          <button
            onClick={() => modalState2.openModal()}
            className={
              "flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] bg-main text-sm text-white outline outline-[1px] outline-offset-[-1px] outline-[#D9D9D9]"
            }
          >
            모임 승인 완료
          </button>
        )}
        {gatheringStatus == null && (
          <button
            onClick={applyGathering}
            className={`${isFullParticipants || !isAllowedGender || (!isAllowedAgeRange && "bg-gray3")} flex h-[3.125rem] w-[7.5rem] items-center justify-center rounded-[2.125rem] text-sm outline outline-[1px] outline-offset-[-1px] outline-[#D9D9D9]`}
            disabled={
              isFullParticipants || !isAllowedGender || !isAllowedAgeRange
            }
          >
            {isFullParticipants
              ? "정원 초과"
              : !isAllowedGender
                ? "성별 제한"
                : !isAllowedAgeRange
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
