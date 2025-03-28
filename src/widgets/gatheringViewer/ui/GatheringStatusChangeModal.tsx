"use client";

import { HashSpinner } from "@/shared/ui/hashSpinner";
import { MdClose } from "react-icons/md";
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
      className="max-h-[20rem] w-full max-w-[28rem]"
      closeModal={closeModal}
    >
      <button
        onClick={closeModal}
        className="absolute top-[2rem] right-[2rem] h-[2rem] w-[2rem] scale-100 transform transition-transform duration-300"
        style={{ zIndex: 200 }}
      >
        <MdClose
          className="bg-red-60 text-gray2 hover:text-main cursor-pointer"
          size="2.5rem"
          onClick={closeModal}
        />
      </button>
      <HashSpinner loading={loading} />
      <div className="flex h-fit w-96 flex-col items-center justify-center gap-6 rounded-xl bg-white p-6">
        <h1 className="text-3xl">모임을 마감하시겠습니까?</h1>
        <div className="text-gray1">
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
            삭제
          </button>
          <button
            className="h-10 rounded-full bg-black px-8 text-white select-none hover:scale-105"
            onClick={closeModal}
          >
            취소
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
};
