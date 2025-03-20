"use client";

import Link from "next/link";
import { DeleteModal } from "@/shared/ui/modal";
import { useInformationViewerButtonList } from "../model/useInformationViewerButtonList";
import { DeleteIcon, EditIcon } from "@/shared/ui/icon";

interface InformationViewerButtonListProps {
  userId: number;
  informationId: number;
}

export const InformationViewerButtonList = ({
  userId,
  informationId,
}: InformationViewerButtonListProps) => {
  const { id, modalVisible, loading, setModalVisible, handleDeleteClick } =
    useInformationViewerButtonList(informationId);

  if (userId !== id) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-row items-center justify-end gap-3">
      {modalVisible && (
        <DeleteModal
          loading={loading}
          onDeleteClick={handleDeleteClick}
          onCancelClick={() => {
            window.history.back();
            setModalVisible(false);
          }}
        />
      )}
      <Link
        className="stroke-gray2 text-gray1 hover:stroke-main hover:text-main flex flex-row items-center gap-1 text-sm"
        href={`/informations/edit/${informationId}`}
      >
        <EditIcon />
        수정
      </Link>
      <button
        className="fill-gray2 stroke-gray2 text-gray1 hover:fill-main hover:stroke-main hover:text-main flex flex-row items-center gap-1 text-sm"
        onClick={() => setModalVisible(true)}
      >
        <DeleteIcon className="fill-inherit" />
        삭제
      </button>
    </div>
  );
};
