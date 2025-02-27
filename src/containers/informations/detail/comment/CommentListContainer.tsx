"use client";

import CommentList from "@/components/informations/detail/comment/CommentList";
import { InformationCommentCreateFormSchema } from "@/lib/zod/schema/InformationCommentCreateFormSchema";
import useAuthStore from "@/stores/authStore";
import {
  CreateInformationCommentRequestDto,
  InformationCommentListResponseDto,
} from "@/types/InformationCommentDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createContext, FormEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface CommentListContainerProps {
  informationId: number;
}

export const CommentContext = createContext({
  page: 0,
  setPage: (_newPage: number) => {},
  getCommentList: async () => {},
});

const CommentListContainer = ({ informationId }: CommentListContainerProps) => {
  const [isFetching, setIsFetching] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [commentList, setCommentList] =
    useState<InformationCommentListResponseDto>();
  const [page, setPage] = useState(1);
  const { id } = useAuthStore();
  const router = useRouter();

  const methods = useForm<{ comment: string }>({
    resolver: zodResolver(InformationCommentCreateFormSchema),
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });

  const getCommentList = async () => {
    setIsFetching(true);

    const response = await fetch(
      `/api/informations/comments/${informationId}?page=${page - 1}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    setIsFetching(false);

    if (!response.ok) {
      alert("댓글 조회에 실패하였습니다.");
      throw new Error(response.statusText);
    }

    const result: InformationCommentListResponseDto = await response.json();
    setCommentList(result);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await methods.trigger();
    if (!methods.formState.isValid) {
      methods.trigger();
      return;
    }

    const { comment } = methods.getValues();
    const data: CreateInformationCommentRequestDto = { comment };

    setSubmissionLoading(true);

    const response = await fetchWithAuth(
      `/api/informations/comments/${informationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      },
    );

    setSubmissionLoading(false);

    if (!response.ok) {
      alert("댓글 등록에 실패하였습니다.");
      throw new Error(response.statusText);
    }

    methods.setValue("comment", "");
    methods.watch("comment");
    getCommentList();
  };

  useEffect(() => {
    getCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <FormProvider {...methods}>
      <CommentContext.Provider
        value={{
          page,
          setPage: (newPage: number) => setPage(newPage),
          getCommentList,
        }}
      >
        <CommentList
          isFetching={isFetching}
          submissionLoading={submissionLoading}
          commentList={commentList}
          page={page}
          userId={id}
          router={router}
          setPage={(newPage: number) => setPage(newPage)}
          onSubmit={onSubmit}
        />
      </CommentContext.Provider>
    </FormProvider>
  );
};

export default CommentListContainer;
