"use client";

import { useModal } from "@/shared/lib/hooks";
import { Modal } from "@/shared/ui/modal";
import { VscSettings } from "react-icons/vsc";
import { GatheringFilterModal } from "./GatheringFilterModal";

export const GatheringFilter = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <button
        className="hover:text-main flex flex-row items-center"
        onClick={openModal}
      >
        <VscSettings size="1.25rem" />
        <div>필터</div>
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <GatheringFilterModal closeModal={closeModal} />
      </Modal>
    </div>
  );
};
