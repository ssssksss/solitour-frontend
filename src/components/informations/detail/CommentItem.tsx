import ReportIcon from "@/components/common/icons/ReportIcon";
import { InformationCommentResponseDto } from "@/types/InformationDto";
import Image from "next/image";

interface CommentItemProps {
  data: InformationCommentResponseDto;
}

const CommentItem = ({ data }: CommentItemProps) => {
  return (
    <div className="flex flex-col gap-[0.625rem] border-b border-b-gray3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <Image
            className="rounded-full border-[0.03125rem] border-[#B8EDD9] bg-lightGreen"
            src={data.userImage}
            alt="userImage"
            width={54}
            height={54}
          />
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-black">{data.nickname}</p>
            <p className="text-xs text-gray1">
              {`${new Date(data.createdDate).toLocaleDateString("ko-KR")}`}
            </p>
          </div>
        </div>
        <ReportIcon className="mb-[0.5625rem] cursor-pointer hover:stroke-main" />
      </div>
      <div>
        <p className="h-[4.375rem] break-words pl-[4.125rem] text-sm text-black">
          {data.content}
        </p>
        <div className="h-8 w-full">
          <div className="flex flex-row items-center justify-end gap-4 text-xs text-gray1">
            <button className="hover:text-main">수정</button>
            <button className="hover:text-main">삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
