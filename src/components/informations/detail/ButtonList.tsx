"use client";

import DeleteModal from "@/shared/ui/modal/DeleteModal";
import DeleteIcon from "@/shared/ui/icon/DeleteIcon";
import EditIcon from "@/shared/ui/icon/EditIcon";
import { useButtonList } from "@/hooks/information/detail/useButtonList";
import Link from "next/link";

interface ButtonListProps {
  userId: number;
  informationId: number;
}

const ButtonList = ({ userId, informationId }: ButtonListProps) => {
  const { id, modalVisible, loading, setModalVisible, handleDeleteClick } =
    useButtonList(informationId);

  if (userId !== id) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-row items-center justify-end gap-3">
      {modalVisible && (
        <DeleteModal
          loading={loading}
          handleDeleteClick={handleDeleteClick}
          handleCancelClick={() => {
            window.history.back();
            setModalVisible(false);
          }}
        />
      )}
      <Link
        className="flex flex-row items-center gap-1 stroke-gray2 text-sm text-gray1 hover:stroke-main hover:text-main"
        href={`/informations/edit/${informationId}`}
      >
        <EditIcon />
        수정
      </Link>
      <button
        className="flex flex-row items-center gap-1 fill-gray2 stroke-gray2 text-sm text-gray1 hover:fill-main hover:stroke-main hover:text-main"
        onClick={() => setModalVisible(true)}
      >
        <DeleteIcon className="fill-inherit" />
        삭제
      </button>
    </div>
  );
};

export default ButtonList;
