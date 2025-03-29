"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { UserImage } from "@/entities/user";
import { useUserDropDown } from "../model/useUserDropDown";

export const UserDropDown = () => {
  const {
    userStore,
    outside,
    inside,
    isOpen,
    openModal,
    closeModal,
    handleLogout,
  } = useUserDropDown();

  return (
    <div
      className="flex w-full cursor-pointer items-center gap-x-2"
      onClick={(e) => {
        if (!isOpen) {
          openModal();
        } else {
          // ref가 할당된 DOM 요소가 있는지 확인
          if (outside.current) {
            // 클릭된 요소가 ref 요소 내부에 포함되지 않으면
            if (!outside.current.contains(e.target as Node)) {
              closeModal();
            } else if (
              outside.current.contains(e.target as Node) &&
              !inside.current?.contains(e.target as Node)
            ) {
              closeModal();
            }
          }
        }
      }}
      ref={outside}
    >
      <UserImage userImageAddress={userStore.userImage.address} size={30} />
      <span className="truncate font-bold">{userStore.nickname}</span>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="outline-primary-20 outline-gray2 fixed top-16 right-0 flex h-auto w-80 cursor-default flex-col gap-y-4 rounded-2xl bg-white p-4 outline -outline-offset-1"
            ref={inside}
            initial={{ y: "-1rem", opacity: 0 }}
            animate={{ y: "0rem", opacity: 1 }}
            exit={{ y: "-1rem", opacity: 0 }}
          >
            <div className="flex h-48 w-full items-center justify-center p-4">
              <Image
                className="bg-lightgreen rounded-full border-[0.03125rem] border-[#B8EDD9]"
                src={userStore.userImage.address}
                alt="유저 이미지"
                width={140}
                height={140}
              />
            </div>
            <Link
              href="/mypage?mainCategory=정보&category=owner"
              className="outline-gray3 1 flex items-center justify-center gap-x-2 rounded-2xl bg-white px-8 py-2 outline -outline-offset-1 hover:scale-105"
              onClick={() => closeModal()}
            >
              <Image
                className="aspect-square h-5 w-5"
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
