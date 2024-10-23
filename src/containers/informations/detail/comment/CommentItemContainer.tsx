"use client";

import CommentItem from "@/components/informations/detail/comment/CommentItem";
import { InformationCommentResponseDto } from "@/types/InformationCommentDto";
import { useState } from "react";

interface CommentItemContainerProps {
  data: InformationCommentResponseDto;
}

const CommentItemContainer = ({ data }: CommentItemContainerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <CommentItem
      data={data}
      modalVisible={modalVisible}
      openModal={() => setModalVisible(true)}
      closeModal={() => setModalVisible(false)}
    />
  );
};

export default CommentItemContainer;
