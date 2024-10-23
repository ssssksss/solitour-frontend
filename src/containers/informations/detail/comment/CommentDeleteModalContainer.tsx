"use client";

import CommentDeleteModal from "@/components/informations/detail/comment/CommentDeleteModal";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useContext, useState } from "react";
import { CommentContext } from "./CommentListContainer";

interface CommentDeleteModalContainerProps {
  commentId: number;
  closeModal: () => void;
}

const CommentDeleteModalContainer = ({
  commentId,
  closeModal,
}: CommentDeleteModalContainerProps) => {
  const [loading, setLoading] = useState(false);
  const { page, setPage, getCommentList } = useContext(CommentContext);

  const onDeleteClick = async () => {
    setLoading(true);

    const response = await fetchWithAuth(
      `/api/informations/comments/${commentId}`,
      { method: "DELETE", cache: "no-store" },
    );

    if (!response.ok) {
      alert("댓글 삭제에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    if (page !== 1) {
      setPage(1);
    } else {
      getCommentList();
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
