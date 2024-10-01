import { InformationCommentResponseDto } from "@/types/InformationDto";
import Image from "next/image";

interface Props {
  data: InformationCommentResponseDto;
}

const CommentItem = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-[0.625rem] border-b border-b-gray3">
      <div className="flex flex-row items-center gap-3">
        <Image
          className="rounded-full border-[0.03125rem] border-[#B8EDD9] bg-[#F2FAF7]"
          src={data.userImage}
          alt="userImage"
          width={54}
          height={54}
        />
        <div className="space-y-1">
          <p className="text-xs font-semibold text-black">{data.nickname}</p>
          <p className="text-xs text-gray1">
            {`${new Date(data.createdDate).toLocaleDateString("ko-KR")}`}
          </p>
        </div>
      </div>
      <div className="break-words pb-10 pl-[4.125rem] text-sm text-black">
        <p>{data.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
