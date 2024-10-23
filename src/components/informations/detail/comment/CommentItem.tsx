import ReportIcon from "@/components/common/icons/ReportIcon";
import CommentDeleteModalContainer from "@/containers/informations/detail/comment/CommentDeleteModalContainer";
import { InformationCommentResponseDto } from "@/types/InformationCommentDto";
import Image from "next/image";

interface CommentItemProps {
  data: InformationCommentResponseDto;
  modalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const CommentItem = ({
  data,
  modalVisible,
  openModal,
  closeModal,
}: CommentItemProps) => {
  return (
    <div className="flex flex-col gap-[0.625rem] border-b border-b-gray3">
      {modalVisible && (
        <CommentDeleteModalContainer
          commentId={data.commentId}
          closeModal={closeModal}
        />
      )}
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
          className="stroke-gray1 hover:stroke-main"
          onClick={() => alert("구현 예정")}
        >
          <ReportIcon className="mb-[0.5625rem] cursor-pointer stroke-inherit" />
        </button>
      </div>
      <div>
        <p className="h-[4.375rem] break-words pl-[4.125rem] text-[0.9375rem] text-black">
          {data.content}
        </p>
        <div className="h-8 w-full">
          <div className="flex flex-row items-center justify-end gap-4 text-sm text-gray1">
            <button className="hover:text-main">수정</button>
            <button className="hover:text-main" onClick={() => openModal()}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
