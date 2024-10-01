import Image from "next/image";

const CommentItem = () => {
  return (
    <div className="flex flex-col gap-[0.625rem] border-b border-b-gray3">
      <div className="flex flex-row items-center gap-3">
        {/* TODO: 유저 이미지 */}
        <Image
          className="rounded-full border-[0.03125rem] border-[#B8EDD9] bg-[#F2FAF7]"
          src="/user/default-female.svg"
          alt="userImage"
          width={54}
          height={54}
        />
        <div className="space-y-1">
          <p className="text-xs font-semibold text-black">
            {"하몽"} {/* TODO: 유저 닉네임 */}
          </p>
          <p className="text-xs text-gray1">
            {`${new Date().toLocaleDateString("ko-KR")}`}
            {/* TODO: 댓글 작성 시각 */}
          </p>
        </div>
      </div>
      <div className="break-words pb-10 pl-[4.125rem] text-sm text-black">
        <p>추천 메뉴 있을까요?</p>
      </div>
    </div>
  );
};

export default CommentItem;
