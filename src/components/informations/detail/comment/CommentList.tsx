"use client";

import HashSpinner from "@/shared/ui/hashSpinner/HashSpinner";
import CommentItemSkeleton from "@/components/skeleton/informations/detail/CommentItemSkeleton";
import CommentPagination from "./CommentPagination";
import { createContext } from "react";
import CommentItem from "./CommentItem";
import { useCommentList } from "@/hooks/information/detail/comment/useCommentList";

interface CommentListProps {
  informationId: number;
}

export const CommentContext = createContext({
  page: 0,
  setPage: (newPage: number) => {},
  getCommentList: async () => {},
});

const CommentList = ({ informationId }: CommentListProps) => {
  const {
    isFetching,
    submissionLoading,
    commentList,
    page,
    userId,
    router,
    methods,
    getCommentList,
    setPage,
    handleSubmit,
  } = useCommentList(informationId);

  return (
    <CommentContext
      value={{
        page,
        setPage: (newPage: number) => setPage(newPage),
        getCommentList,
      }}
    >
      <div className="mt-20 flex w-full flex-col border-t border-t-gray1">
        <HashSpinner loading={submissionLoading} />
        <h2 className="mt-[2.125rem] flex flex-row gap-2 text-2xl font-bold">
          댓글
          <span className="text-main">
            {commentList?.page.totalElements ?? 0}
          </span>
        </h2>
        <form
          className="mt-6 flex flex-row items-center gap-6"
          onSubmit={handleSubmit}
          onClick={(e) => {
            if (userId === -1) {
              e.preventDefault();
              e.stopPropagation();
              alert("로그인 후 이용하실 수 있습니다.");
              router.push("/auth/signin");
            }
          }}
        >
          <div className="relative w-full">
            <input
              className={`${methods.formState.errors.comment ? "border-red-500" : "border-gray3 hover:border-main focus:border-main"} flex h-[2.75rem] w-full rounded-3xl border px-6 text-sm outline-none`}
              type="text"
              placeholder="자유롭게 소통을 해보세요."
              {...methods.register("comment")}
              maxLength={200}
              autoComplete="off"
              onChange={(e) => {
                methods.setValue("comment", e.target.value);
                if (methods.formState.errors.comment) {
                  methods.trigger("comment");
                } else {
                  methods.watch("comment");
                }
              }}
            />
            {methods.formState.errors.comment && (
              <p className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
                {methods.formState.errors.comment.message as String}
              </p>
            )}
          </div>
          <button
            className="h-[2.75rem] min-w-[7.75rem] rounded-3xl bg-black text-[0.9375rem] text-white hover:scale-105 max-[400px]:min-w-24"
            type="submit"
          >
            등록하기
          </button>
        </form>
        <div className="mt-9 flex flex-col gap-4">
          {isFetching ? (
            Array.from({ length: 5 }, (_, index) => index).map((value) => (
              <CommentItemSkeleton key={value} />
            ))
          ) : (commentList?.content.length ?? 0) === 0 ? (
            <p className="flex h-[6.0625rem] w-full items-center justify-center text-sm text-gray1">
              아직 댓글이 없어요.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {commentList?.content.map((comment) => (
                <CommentItem key={comment.commentId} data={comment} />
              ))}
              <CommentPagination
                currentPage={page}
                totalPages={commentList!.page.totalPages}
                setPage={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </CommentContext>
  );
};

export default CommentList;
