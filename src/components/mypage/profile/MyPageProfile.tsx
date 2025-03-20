"use client";

import Image from "next/image";
import { User } from "@/entities/user";
import { useMyPageProfile } from "@/hooks/mypage/profile/useMyPageProfile";
import { Modal } from "@/components/common/modal/Modal";
import MyPageAccountDeleteModal from "./MyPageAccountDeleteModal";
import MyPageUserImage from "../MyPageUserImage";
import { Breadcrumbs } from "@/shared/ui/breadcrumb";

const NICKNAME_LENGTH = 30;
const MYPAGE_PROFILE_BREADCRUMB_PATH = [
  { label: "마이페이지", href: "/mypage?mainCategory=정보&category=owner" },
  { label: "프로필 설정", href: "" },
];

interface MyPageProfileProps {
  userInfo: User;
}

const MyPageProfile = ({ userInfo }: MyPageProfileProps) => {
  const {
    nickname,
    defaultNickname,
    message,
    modalState,
    handleNicknameChange,
    handleSubmit,
  } = useMyPageProfile(userInfo);

  return (
    <div className="flex w-full flex-col">
      <Breadcrumbs categories={MYPAGE_PROFILE_BREADCRUMB_PATH} />
      <h1 className="text-3xl font-semibold">프로필 설정</h1>
      <MyPageUserImage
        userImageUrl={userInfo.userImage.address}
        userSex={userInfo.sex}
      />
      <div className="mt-4 flex flex-col gap-y-[2.375rem]">
        <article>
          <div className="flex w-full items-center gap-x-[2.375rem]">
            <div className="relative w-[3.5rem] shrink-0">
              <span className="text-lg font-semibold">닉네임</span>
              <span className="text-main absolute top-[-.5rem] text-lg">*</span>
            </div>
            <label className="group relative w-full">
              <input
                className="flex h-[3.25rem] w-full rounded-[28px] pr-[5rem] pl-[2rem] outline outline-offset-[-1px] outline-[#E3E3E3]"
                type="text"
                autoComplete="search"
                name="nickname"
                placeholder="닉네임을 입력해주세요"
                maxLength={NICKNAME_LENGTH}
                minLength={1}
                defaultValue={userInfo.nickname}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.ctrlKey && e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                onChange={(e) => handleNicknameChange(e.target.value)}
              />
              <button
                className={
                  `${nickname === defaultNickname ? "bg-gray-400" : "bg-main"}` +
                  "absolute top-1/2 right-2 h-[2.4rem] translate-y-[-50%] rounded-[28px] px-3 text-white opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100"
                }
                onClick={handleSubmit}
              >
                변경
              </button>
            </label>
          </div>
          <div
            className={`${message ? "justify-between" : "justify-end"} text-gray1 flex w-full pt-[.75rem] pl-[7.75rem] text-sm`}
          >
            {message !== "" && (
              <span
                className={
                  message === "성공" ? "text-blue-400" : "text-[#FF0000]"
                }
              >
                {`닉네임 변경에 ${message}했습니다.`}
              </span>
            )}
            <span>
              {nickname.length}/{NICKNAME_LENGTH}
            </span>
          </div>
        </article>
        <article>
          <div className="flex w-full items-center gap-x-[2.375rem]">
            <div className="relative w-[3.5rem] shrink-0">
              <span className="text-lg font-semibold">이메일</span>
            </div>
            <input
              disabled={true}
              placeholder="이메일을 입력해주세요"
              className="h-[3.25rem] w-full rounded-[28px] pl-[2rem] outline outline-offset-[-1px] outline-[#E3E3E3]"
              defaultValue={userInfo.email}
            />
          </div>
        </article>
        <article>
          <div className="grid h-[2.5rem] w-full grid-cols-[6rem_auto] gap-x-[1.75rem]">
            <div className="flex items-center text-lg font-semibold">
              연동된 계정
            </div>
            <div className="flex items-center justify-between">
              <span>{userInfo.provider}</span>
              <div className="flex items-center gap-x-[.875rem]">
                <span className="text-gray1 font-medium">
                  {userInfo.userImage.createdDate}
                </span>
                {userInfo.provider === "kakao" && (
                  <div className="relative flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[50%] bg-[#FEE501] p-4">
                    <Image
                      className="absolute translate-x-[1px]"
                      src="/icons/kakao-icon.svg"
                      alt="kakao-icon"
                      width={20}
                      height={20}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
      <div className="flex w-full justify-end pt-[3rem] text-[#999999]">
        <button
          className="hover:text-main hover:font-bold"
          onClick={modalState.openModal}
        >
          회원탈퇴
        </button>
      </div>
      <Modal modalState={modalState}>
        <MyPageAccountDeleteModal userInfo={userInfo} />
      </Modal>
    </div>
  );
};
export default MyPageProfile;
