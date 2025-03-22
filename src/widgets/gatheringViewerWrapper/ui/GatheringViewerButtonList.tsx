"use client";

import { useUserStore } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks";
import { useToastifyStore } from "@/shared/model/toastifyStore";
import { DeleteIcon, EditIcon } from "@/shared/ui/icon";
import { DeleteModal, Modal } from "@/shared/ui/modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface GatheringViewerButtonListProps {
  userId: number;
  gatheringId: number;
}

export const GatheringViewerButtonList = ({
  userId,
  gatheringId,
}: GatheringViewerButtonListProps) => {
  const userStore = useUserStore();
  const toastifyStore = useToastifyStore();
  const [loading, setLoading] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  const handleDeleteClick = async () => {
    setLoading(true);

    const response = await fetch(`/api/gathering?id=${gatheringId}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      toastifyStore.setToastifyState({
        type: "error",
        message: "모임 삭제에 실패했습니다.",
      });
      setLoading(false);
      closeModal();
      return;
    }

    router.replace("/gathering");
    router.refresh();
  };

  if (userId !== userStore.id) {
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
