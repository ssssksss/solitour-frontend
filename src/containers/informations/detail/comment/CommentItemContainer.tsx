"use client";

import CommentItem from "@/components/informations/detail/comment/CommentItem";
import { InformationCommentUpdateFormSchema } from "@/lib/zod/schema/InformationCommentUpdateFormSchema";
import { InformationCommentResponseDto } from "@/types/InformationCommentDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { FormEvent, useContext, useState } from "react";
import { CommentContext } from "./CommentListContainer";
import useAuthStore from "@/stores/authStore";

interface CommentItemContainerProps {
  data: InformationCommentResponseDto;
}

const CommentItemContainer = ({ data }: CommentItemContainerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editable, setEditable] = useState(false);
  const [comment, setComment] = useState(data.content);
  const [loading, setLoading] = useState(false);
  const { id } = useAuthStore();
  const { getCommentList } = useContext(CommentContext);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  return (
    <CommentItem
      data={data}
      modalVisible={modalVisible}
      editable={editable}
      comment={comment}
      loading={loading}
      userId={id}
      openModal={() => setModalVisible(true)}
      closeModal={() => setModalVisible(false)}
      setEditable={setEditable}
      setComment={(value: string) => setComment(value)}
      onSubmit={onSubmit}
    />
  );
};

export default CommentItemContainer;
