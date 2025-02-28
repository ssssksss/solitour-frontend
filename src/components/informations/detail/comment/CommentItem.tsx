"use client";

import HashSpinner from "@/components/common/HashSpinner";
import ReportIcon from "@/components/common/icons/ReportIcon";
import { InformationCommentResponseDto } from "@/types/InformationCommentDto";
import Image from "next/image";
import CommentDeleteModal from "./CommentDeleteModal";
import { useCommentItem } from "@/hooks/information/detail/comment/useCommentItem";

interface CommentItemProps {
  data: InformationCommentResponseDto;
}

const CommentItem = ({ data }: CommentItemProps) => {
  const {
    userId,
    loading,
    modalVisible,
    editable,
    comment,
    setModalVisible,
    setEditable,
    setComment,
    handleSubmit,
  } = useCommentItem(data);

  return (
    <div className="flex flex-col gap-[0.625rem] border-b border-b-gray3">
      {modalVisible && (
        <CommentDeleteModal
          commentId={data.commentId}
          closeModal={() => setModalVisible(false)}
        />
      )}
      <HashSpinner loading={loading} />
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <Image
            className="rounded-full border-[0.03125rem] border-[#B8EDD9] bg-lightGreen"
            src={data.userProfile}
            alt="userImage"
            width={54}
            height={54}
          />
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-black">
              {data.userNickname}
            </p>
            <p className="text-xs text-gray1">
              {`${new Date(data.updatedAt).toLocaleDateString("ko-KR")}`}
            </p>
          </div>
        </div>
        <button
          className="invisible stroke-gray1 hover:stroke-main"
          onClick={() => alert("TODO: 구현 예정")}
        >
          <ReportIcon className="mb-[0.5625rem] cursor-pointer stroke-inherit" />
        </button>
      </div>
      {editable ? (
        <form className="pl-[4.125rem]" onSubmit={handleSubmit}>
          <div className="relative h-[4.375rem]">
            <input
              className={`${comment.length === 0 ? "border-red-500" : "border-gray3 hover:border-main focus:border-main"} h-[2.75rem] w-full rounded-3xl border px-6 text-sm text-black outline-none`}
              type="text"
              placeholder="자유롭게 소통을 해보세요."
              value={comment}
              maxLength={200}
              autoComplete="off"
              onChange={(e) => setComment(e.target.value)}
            />
            {comment.length === 0 && (
              <p className="absolute bottom-1 left-4 mt-1 text-xs text-red-500">
                댓글을 입력해 주세요.
              </p>
            )}
          </div>
          <div className="flex h-8 w-full flex-row items-start justify-end gap-4 text-sm text-gray1">
            <button className="hover:text-main" type="submit">
              수정
            </button>
            <button
              className="hover:text-main"
              type="button"
              onClick={() => setEditable(false)}
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p className="min-h-[4.375rem] break-words pl-[4.125rem] text-[0.9375rem] text-black">
            {data.content}
          </p>
          {userId === data.userId && (
            <div className="flex h-8 w-full flex-row items-start justify-end gap-4 text-sm text-gray1">
              <button
                className="hover:text-main"
                onClick={() => {
                  setComment(data.content);
                  setEditable(true);
                }}
              >
                수정
              </button>
              <button
                className="hover:text-main"
                onClick={() => setModalVisible(true)}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
