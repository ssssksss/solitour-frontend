"use client";

import { HashSpinner } from "@/shared/ui/hashSpinner";
import { ModalTemplate } from "@/shared/ui/modal";
import { useGatheringStatusChangeModal } from "../model/useGatheringStatusChangeModal";

interface GatheringStatusChangeModalProps {
  isFinish: boolean;
  closeModal: () => void;
}

export const GatheringStatusChangeModal = ({
  isFinish,
  closeModal,
}: GatheringStatusChangeModalProps) => {
  const { loading, handleRemoveClick } = useGatheringStatusChangeModal(
    isFinish,
    closeModal,
  );

  return (
    <ModalTemplate
      className="max-h-80 w-full max-w-112 gap-6 p-6"
      closeModal={closeModal}
    >
      <HashSpinner loading={loading} />
      <h1 className="text-3xl">모임을 마감하시겠습니까?</h1>
      <div className="text-gray1 text-sm">
        {[
          "모임을 마감하시면 추가적으로 인원을 받을 수 없고 검색에서 제외됩니다.",
          "단, 기존 승인된 회원은 조회가 가능합니다.",
        ].map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
      <div className="flex flex-row gap-4">
        <button
          className="bg-main h-10 rounded-full px-8 text-white select-none hover:scale-105"
          onClick={handleRemoveClick}
        >
          마감
        </button>
        <button
          className="h-10 rounded-full bg-black px-8 text-white select-none hover:scale-105"
          onClick={closeModal}
        >
          취소
        </button>
      </div>
    </ModalTemplate>
  );
};
