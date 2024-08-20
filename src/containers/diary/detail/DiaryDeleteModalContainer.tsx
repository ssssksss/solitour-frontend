"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { useRouter } from "next/navigation";

interface Props {
  diaryId: number;
  closeModal: () => void;
}

const DiaryDeleteModalContainer = ({ diaryId, closeModal }: Props) => {
  const router = useRouter();

  const onDeleteClick = async () => {
    const response = await fetch(`/api/diary/delete/${diaryId}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      alert("일기 삭제에 실패하였습니다.");
      throw new Error(response.statusText);
    }

    router.replace("/diary/list");
    router.refresh();
  };

  const onCancelClick = () => {
    closeModal();
  };

  return (
    <DeleteModal onDeleteClick={onDeleteClick} onCancelClick={onCancelClick} />
  );
};

export default DiaryDeleteModalContainer;
