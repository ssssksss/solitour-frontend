"use client";

import CommentList from "@/components/informations/detail/CommentList";
import { InformationCommentResponseDto } from "@/types/InformationDto";
import { useEffect, useState } from "react";

interface CommentListContainerProps {
  informationId: number;
}

const CommentListContainer = ({ informationId }: CommentListContainerProps) => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<InformationCommentResponseDto[]>([]);

  useEffect(() => {
    // TODO: API 연동 필요
    // (async function () {
    //   const response = await fetch(`/api/informations/comment/${informationId}`, {
    //     method: "GET",
    //     cache: "no-store",
    //   });
    //
    //   setLoading(false);
    //
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   setComments(
    //     await (response.json() as Promise<InformationCommentResponseDto[]>),
    //   );
    // })();

    // TODO: 임시 코드입니다.
    (async function () {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      setLoading(false);
      setComments([
        {
          userImage: "/user/default-female.svg",
          nickname: "하몽",
          createdDate: new Date(),
          content: "좋아보여요~",
        },
        {
          userImage: "/user/default-female.svg",
          nickname: "유저d0f",
          createdDate: new Date(),
          content: "추천 메뉴 있을까요?",
        },
      ]);
    })();
  }, []);

  return <CommentList loading={loading} comments={comments} />;
};

export default CommentListContainer;
