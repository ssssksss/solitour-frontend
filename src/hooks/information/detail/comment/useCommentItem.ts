"use client";

import { CommentContext } from "@/components/informations/detail/comment/CommentList";
import { InformationCommentUpdateFormSchema } from "@/lib/zod/schema/InformationCommentUpdateFormSchema";
import useAuthStore from "@/stores/authStore";
import { InformationCommentResponseDto } from "@/types/InformationCommentDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { FormEvent, useContext, useState } from "react";

export const useCommentItem = (data: InformationCommentResponseDto) => {
  const { id } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editable, setEditable] = useState(false);
  const [comment, setComment] = useState(data.content);
  const { getCommentList } = useContext(CommentContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validatedFields = InformationCommentUpdateFormSchema.safeParse({
      comment,
    });

    if (!validatedFields.success) {
      console.error(validatedFields.error.issues);
      alert(validatedFields.error.issues[0].message);
      return;
    }

    setLoading(true);

    const response = await fetchWithAuth(
      `/api/informations/comments/${data.commentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: validatedFields.data.comment }),
        cache: "no-store",
      },
    );

    setLoading(false);

    if (!response.ok) {
      alert("댓글 수정에 실패하였습니다.");
      throw new Error(response.statusText);
    }

    getCommentList();
  };

  return {
    userId: id,
    loading,
    modalVisible,
    editable,
    comment,
    setModalVisible,
    setEditable,
    setComment,
    handleSubmit,
  };
};
