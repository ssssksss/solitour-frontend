"use client";

import Image from "next/image";
import Link from "next/link";
import UserImage from "./UserImage";
import { AnimatePresence, motion } from "motion/react";
import { useUserDropDown } from "@/hooks/auth/useUserDropDown";

const UserDropDown = () => {
  const { userStore, modalState, outside, inside, handleLogout } =
    useUserDropDown();

  return (
    <div
      className="flex w-full cursor-pointer items-center gap-x-2"
      onClick={(e) => {
        if (!modalState.isOpen) {
          modalState.openModal();
        } else {
          // ref가 할당된 DOM 요소가 있는지 확인
          if (outside.current) {
            // 클릭된 요소가 ref 요소 내부에 포함되지 않으면
            if (!outside.current.contains(e.target as Node)) {
              modalState.closeModal();
            } else if (
              outside.current.contains(e.target as Node) &&
              !inside.current?.contains(e.target as Node)
            ) {
              modalState.closeModal();
            }
          }
        }
      }}
      ref={outside}
    >
      <UserImage
        userImageAddress={`${userStore.userImage.address}`}
        userSex={`${userStore.sex}`}
        size={30}
      />
      <span className="overflow-hidden font-bold text-ellipsis whitespace-nowrap">
        {userStore.nickname}
      </span>
      <AnimatePresence>
        {modalState.isOpen && (
          <motion.section
            className="outline-primary-20 outline-gray2 fixed top-[4rem] right-0 flex h-auto w-[20rem] cursor-default flex-col gap-y-4 rounded-2xl bg-white p-4 outline outline-offset-[-0.0625rem]"
            ref={inside}
            initial={{ y: "-1rem", opacity: 0 }}
            animate={{ y: "0rem", opacity: 1 }}
            exit={{ y: "-1rem", opacity: 0 }}
          >
            <div className="flex h-[12rem] w-full items-center justify-center p-4">
              <Image
                className="bg-lightGreen rounded-full border-[0.03125rem] border-[#B8EDD9]"
                src={userStore.userImage.address}
                alt="유저 이미지"
                width={140}
                height={140}
              />
            </div>
            <Link
              href="/mypage?mainCategory=정보&category=owner"
              className="outline-gray3 1 flex items-center justify-center gap-x-2 rounded-2xl bg-white px-8 py-2 outline outline-offset-[-0.0625rem] hover:scale-105"
              onClick={() => modalState.closeModal()}
            >
              <Image
                className="aspect-square h-[1.25rem] w-[1.25rem]"
                src="/icons/mypage-empty-icon.svg"
                alt="mypage-empty-icon"
                width={20}
                height={20}
              />
              마이페이지
            </Link>
            <button
              className="bg-main rounded-2xl px-8 py-2 font-semibold text-white hover:scale-105"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropDown;
