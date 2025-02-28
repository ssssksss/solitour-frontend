"use client";

import { CommentContext } from "@/containers/informations/detail/comment/CommentListContainer";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useContext, useState } from "react";

export const useCommentDeleteModal = (commentId: number) => {
  const [loading, setLoading] = useState(false);
  const { page, setPage, getCommentList } = useContext(CommentContext);

  const handleDeleteClick = async () => {
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

  return { loading, handleDeleteClick };
};
