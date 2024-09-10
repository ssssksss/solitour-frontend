"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  diaryId: number;
  closeModal: () => void;
}

const DiaryDeleteModalContainer = ({ diaryId, closeModal }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onDeleteClick = async () => {
    setLoading(true);

    const response = await fetch(`/api/diary/${diaryId}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      alert("일기 삭제에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    router.replace("/diary/list?page=1");
    router.refresh();
  };

  const onCancelClick = () => {
    closeModal();
  };

  return (
    <DeleteModal
      loading={loading}
      onDeleteClick={onDeleteClick}
      onCancelClick={onCancelClick}
    />
  );
};

export default DiaryDeleteModalContainer;
