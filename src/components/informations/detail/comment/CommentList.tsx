import HashSpinner from "@/components/common/HashSpinner";
import CommentItemSkeleton from "@/components/skeleton/informations/detail/CommentItemSkeleton";
import CommentItemContainer from "@/containers/informations/detail/comment/CommentItemContainer";
import { InformationCommentListResponseDto } from "@/types/InformationCommentDto";
import { useFormContext } from "react-hook-form";
import CommentPagination from "./CommentPagination";

interface CommentListProps {
  isFetching: boolean;
  submissionLoading: boolean;
  commentList?: InformationCommentListResponseDto;
  page: number;
  setPage: (newPage: number) => void;
  onSubmit: () => Promise<void>;
}

const CommentList = ({
  isFetching,
  submissionLoading,
  commentList,
  page,
  setPage,
  onSubmit,
}: CommentListProps) => {
  const formContext = useFormContext();

  return (
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
        action={() => onSubmit()}
      >
        <div className="relative w-full">
          <input
            className={`${formContext.formState.errors.comment ? "border-red-500" : "border-gray3 hover:border-main focus:border-main"} flex h-[2.75rem] w-full rounded-3xl border px-6 text-sm outline-none`}
            type="text"
            placeholder="자유롭게 소통을 해보세요."
            {...formContext.register("comment")}
            maxLength={200}
            autoComplete="off"
            onChange={(e) => {
              formContext.setValue("comment", e.target.value);
              if (formContext.formState.errors.comment) {
                formContext.trigger("comment");
              } else {
                formContext.watch("comment");
              }
            }}
          />
          {formContext.formState.errors.comment && (
            <p className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
              {formContext.formState.errors.comment.message as String}
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
              <CommentItemContainer key={comment.commentId} data={comment} />
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
  );
};

export default CommentList;
