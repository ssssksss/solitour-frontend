"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { useRouter } from "next/navigation";

interface Props {
  informationId: number;
  closeModal: () => void;
}

const InformationDeleteModalContainer = ({
  informationId,
  closeModal,
}: Props) => {
  const router = useRouter();

  const onDeleteClick = async () => {
    const response = await fetch(`/api/informations/${informationId}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      alert("정보 삭제에 실패하였습니다.");
      throw new Error(response.statusText);
    }

    router.replace("/informations/list/parent-category/1?page=1");
  };

  const onCancelClick = () => {
    closeModal();
  };

  return (
    <DeleteModal onDeleteClick={onDeleteClick} onCancelClick={onCancelClick} />
  );
};

export default InformationDeleteModalContainer;
