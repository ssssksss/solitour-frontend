import { InformationCommentResponseDto } from "@/types/InformationDto";
import CommentItem from "./CommentItem";
import CommentItemSkeleton from "@/components/skeleton/informations/detail/CommentItemSkeleton";

interface CommentListProps {
  loading: boolean;
  comments: InformationCommentResponseDto[];
}

const CommentList = ({ loading, comments }: CommentListProps) => {
  return (
    <div className="mt-20 flex w-full flex-col border-t border-t-gray1">
      <h2 className="mt-[2.125rem] text-2xl font-bold">
        댓글 <span className="text-main">{comments.length}</span>
      </h2>
      <form
        className="mt-6 flex flex-row items-center gap-6"
        action={() => alert("구현 예정입니다.")}
      >
        <input
          className="flex h-[2.75rem] w-full rounded-3xl border px-6 text-sm outline-none hover:border-main focus:border-main active:border-main"
          type="text"
          placeholder="자유롭게 소통을 해보세요."
        />
        <button
          className="h-[2.75rem] min-w-[7.75rem] rounded-3xl bg-black text-[0.9375rem] text-white hover:scale-105 max-[400px]:min-w-24"
          type="submit"
        >
          등록하기
        </button>
      </form>
      <div className="mt-9 flex flex-col gap-4">
        {Array.from({ length: 2 }, (_, index) => index).map((value) => (
          <CommentItemSkeleton key={value} />
        ))}
        {loading ? (
          Array.from({ length: 2 }, (_, index) => index).map((value) => (
            <CommentItemSkeleton key={value} />
          ))
        ) : comments.length === 0 ? (
          <p className="flex h-[6.0625rem] w-full items-center justify-center text-sm text-gray1">
            아직 댓글이 없어요.
          </p>
        ) : (
          comments.map((comment, index) => (
            <CommentItem key={index} data={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;
