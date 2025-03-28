"use client";

import Link from "next/link";
import { useUserStore } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks";
import { DeleteIcon, EditIcon } from "@/shared/ui/icon";
import { DeleteModal, Modal } from "@/shared/ui/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToastifyStore } from "@/shared/model";
import { deleteGathering } from "@/entities/gathering";

interface GatheringViewerButtonListProps {
  userId: number;
  gatheringId: number;
}

export const GatheringViewerButtonList = ({
  userId,
  gatheringId,
}: GatheringViewerButtonListProps) => {
  const { id } = useUserStore();
  const { setToastifyState } = useToastifyStore();
  const [loading, setLoading] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  const handleDeleteClick = async () => {
    try {
      setLoading(true);
      await deleteGathering(gatheringId);
      router.replace("/gathering");
    } catch (error) {
      setToastifyState({
        type: "error",
        message: "모임 삭제에 실패했습니다.",
      });
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  if (userId !== id) {
    return null;
  }

  return (
    <div className="mt-6 flex w-full flex-row items-center justify-end gap-3 text-sm">
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <DeleteModal
          loading={loading}
          onDeleteClick={handleDeleteClick}
          onCancelClick={() => {
            window.history.back();
            closeModal();
          }}
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
