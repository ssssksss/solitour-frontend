"use client";

import Link from "next/link";
import { useUserStore } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks";
import { DeleteIcon, EditIcon } from "@/shared/ui/icon";
import { DeleteModal, Modal } from "@/shared/ui/modal";
import { useGatheringViewerButtonList } from "../model/useGatheringViewerButtonList";

interface GatheringViewerButtonListProps {
  userId: number;
  gatheringId: number;
}

export const GatheringViewerButtonList = ({
  userId,
  gatheringId,
}: GatheringViewerButtonListProps) => {
  const { id } = useUserStore();
  const { isOpen, openModal, closeModal } = useModal();
  const { loading, handleDeleteClick } =
    useGatheringViewerButtonList(gatheringId);

  if (userId !== id) {
    return null;
  }

  return (
    <div className="mt-6 flex w-full flex-row items-center justify-end gap-3 text-sm">
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <DeleteModal
          loading={loading}
          onDeleteClick={handleDeleteClick}
          onCancelClick={closeModal}
        />
      </Modal>
      <Link
        className="stroke-gray2 hover:stroke-main hover:text-main flex flex-row items-center gap-1"
        href={`/gathering/edit/${gatheringId}`}
      >
        <EditIcon />
        수정
      </Link>
      <button
        className="fill-gray2 stroke-gray2 hover:fill-main hover:stroke-main hover:text-main flex flex-row items-center gap-1"
        onClick={() => openModal()}
      >
        <DeleteIcon className="fill-inherit" />
        삭제
      </button>
    </div>
  );
};
