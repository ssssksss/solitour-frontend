"use client";

import CommentList from "@/components/informations/detail/CommentList";

interface Props {
  informationId: number;
}

const CommentListContainer = ({ informationId }: Props) => {
  return <CommentList />;
};

export default CommentListContainer;
