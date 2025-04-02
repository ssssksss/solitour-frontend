import { getUserInfo, UserImage } from "@/entities/user";
import Link from "next/link";

export const MyPageHeader = async () => {
  const userInfo = await getUserInfo();

  return (
    <div className="flex w-full max-w-240 flex-col pt-10">
      <h1 className="text-3xl font-bold">마이페이지</h1>
      <article className="flex flex-col gap-8.5 pt-19.5 pb-9.5">
        <div className="flex flex-row items-center gap-7.5">
          <div className="bg-lightgreen relative aspect-square w-27 rounded-[50%] outline -outline-offset-1 outline-[#B8EDD9]">
            <UserImage
              userImageAddress={userInfo.userImage.address}
              size={108}
            />
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-semibold text-black">
              {userInfo.nickname}
            </div>
            <div className="text-gray1">{userInfo.email}</div>
          </div>
        </div>
        <Link
          className="flex h-14.5 w-full items-center justify-center rounded-xl bg-[#F7F7F7] text-black duration-500 hover:scale-105"
          href="/mypage/profile"
        >
          프로필 수정
        </Link>
      </article>
    </div>
  );
};
