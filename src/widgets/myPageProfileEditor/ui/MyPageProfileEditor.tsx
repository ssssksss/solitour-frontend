"use client";

import Image from "next/image";
import { Modal } from "@/components/common/modal/Modal";
import { User } from "@/entities/user";
import { MyPageUserImage } from "./MyPageUserImage";
import { MyPageAccountDeleteModal } from "./MyPageAccountDeleteModal";
import { MyPageNicknameEditor } from "@/features/myPageNicknameEditor";
import { useModalState } from "@/shared/lib/hooks";

interface MyPageProfileProps {
  userInfo: User;
}

export const MyPageProfileEditor = ({ userInfo }: MyPageProfileProps) => {
  const modalState = useModalState();

  return (
    <div>
      <h1 className="text-3xl font-semibold">프로필 설정</h1>
      <MyPageUserImage
        userImageUrl={userInfo.userImage.address}
        userSex={userInfo.sex}
      />
      <article className="mt-4 flex flex-col gap-y-[2.375rem]">
        <MyPageNicknameEditor initialNickname={userInfo.nickname} />
        <section>
          <div className="flex w-full items-center gap-x-[2.375rem]">
            <div className="relative w-[3.5rem] shrink-0">
              <span className="text-lg font-semibold">이메일</span>
            </div>
            <input
              className="h-[3.25rem] w-full rounded-[28px] pl-[2rem] outline -outline-offset-1 outline-[#E3E3E3]"
              placeholder="이메일을 입력해주세요"
              disabled={true}
              defaultValue={userInfo.email}
            />
          </div>
        </section>
        <section>
          <div className="grid h-10 w-full grid-cols-[6rem_auto] gap-x-[1.75rem]">
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
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-[50%] bg-[#FEE501] p-4">
                    <Image
                      className="absolute translate-x-px"
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
        </section>
      </article>
      <div className="flex w-full justify-end pt-12 text-[#999999]">
        <button
          className="hover:text-main hover:font-bold"
          onClick={modalState.openModal}
        >
          회원 탈퇴
        </button>
      </div>
      <Modal modalState={modalState}>
        <MyPageAccountDeleteModal userInfo={userInfo} />
      </Modal>
    </div>
  );
};
