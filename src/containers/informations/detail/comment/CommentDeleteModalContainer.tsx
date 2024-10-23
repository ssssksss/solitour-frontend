"use client";

import CommentDeleteModal from "@/components/informations/detail/comment/CommentDeleteModal";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CommentDeleteModalContainerProps {
  commentId: number;
  closeModal: () => void;
}

const CommentDeleteModalContainer = ({
  commentId,
  closeModal,
}: CommentDeleteModalContainerProps) => {
  const [loading, setLoading] = useState(false);

  const onDeleteClick = async () => {
    setLoading(true);

    const response = await fetchWithAuth(
      `/api/informations/comments/${commentId}`,
      { method: "DELETE", cache: "no-store" },
    );

    setLoading(false);

    if (!response.ok) {
      alert("댓글 삭제에 실패하였습니다.");
      throw new Error(response.statusText);
    }
  };

  return (
    <CommentDeleteModal
      loading={loading}
      onDeleteClick={onDeleteClick}
      onCancelClick={closeModal}
    />
  );
};

export default CommentDeleteModalContainer;
