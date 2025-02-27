import Image from "next/image";
import Link from "next/link";
import UserImage from "./UserImage";
import { AnimatePresence, motion } from "motion/react";
import { useUserDropDown } from "@/hooks/auth/useUserDropDown";

const UserDropDown = () => {
  const { authStore, modalState, outside, inside, handleLogout } =
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
        userImageAddress={`${authStore.userImage.address}`}
        userSex={`${authStore.sex}`}
        size={30}
      />
      <span className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
        {authStore.nickname}
      </span>
      <AnimatePresence>
        {modalState.isOpen && (
          <motion.section
            className="outline-primary-20 fixed right-0 top-[4rem] flex h-auto w-[20rem] cursor-default flex-col gap-y-4 rounded-2xl bg-white p-4 outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-gray2"
            ref={inside}
            initial={{ y: "-1rem", opacity: 0 }}
            animate={{ y: "0rem", opacity: 1 }}
            exit={{ y: "-1rem", opacity: 0 }}
          >
            <div className="flex h-[12rem] w-full items-center justify-center p-4">
              <Image
                className="rounded-full border-[0.03125rem] border-[#B8EDD9] bg-lightGreen"
                src={authStore.userImage.address}
                alt="유저 이미지"
                width={140}
                height={140}
              />
            </div>
            <Link
              href="/mypage?mainCategory=정보&category=owner"
              className="flex items-center justify-center gap-x-2 rounded-2xl bg-white px-8 py-2 outline outline-1 outline-offset-[-0.0625rem] outline-gray3 hover:scale-105"
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
              className="rounded-2xl bg-main px-8 py-2 font-semibold text-white hover:scale-105"
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
