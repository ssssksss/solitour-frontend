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
  const router = useRouter();

  const onDeleteClick = async () => {
    setLoading(true);

    // TODO: 댓글 삭제 기능 구현
    // const response = await fetchWithAuth(
    //   `/api/informations/comment/${commentId}`,
    //   { method: "DELETE", cache: "no-store" },
    // );

    // if (!response.ok) {
    //   alert("댓글 삭제에 실패하였습니다.");
    //   setLoading(false);
    //   throw new Error(response.statusText);
    // }
    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.refresh();
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
