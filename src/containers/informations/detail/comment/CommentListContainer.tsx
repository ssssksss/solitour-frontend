"use client";

import CommentList from "@/components/informations/detail/comment/CommentList";
import { InformationCommentCreateFormSchema } from "@/lib/zod/schema/InformationCommentCreateFormSchema";
import { InformationCommentListResponseDto } from "@/types/InformationCommentDto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface CommentListContainerProps {
  informationId: number;
}

const CommentListContainer = ({ informationId }: CommentListContainerProps) => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<InformationCommentListResponseDto>();

  const methods = useForm<{ comment: string }>({
    resolver: zodResolver(InformationCommentCreateFormSchema),
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    (async function () {
      const response = await fetch(
        `/api/informations/comments/${informationId}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      setLoading(false);

      if (!response.ok) {
        alert("댓글 조회에 실패하였습니다.");
        throw new Error(response.statusText);
      }

      const result: InformationCommentListResponseDto = await response.json();
      setComments(result);
    })();
  }, [informationId]);

  return (
    <FormProvider {...methods}>
      <CommentList loading={loading} comments={comments} />
    </FormProvider>
  );
};

export default CommentListContainer;
