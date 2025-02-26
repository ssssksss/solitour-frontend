import useModalState from "@/hooks/useModalState";
import useOutsideClick from "@/hooks/useOutsideClick";
import useAuthStore from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import UserImage from "./UserImage";

const UserDropDown = () => {
  const authStore = useAuthStore();
  const modalState = useModalState();
  const router = useRouter();
  const ref = useRef<any>(undefined);
  const ref1 = useRef<any>(undefined);

  const logoutHandler = async () => {
    // api로 로그아웃 요청해서 쿠키제거
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    authStore.initialize();
    router.push("/");
    router.refresh();
  };

  useOutsideClick(ref, () => {
    modalState.closeModal();
  });

  return (
    <button
      className="flex w-full items-center gap-x-2"
      onClick={(e) => {
        if (!modalState.isOpen) {
          modalState.openModal();
        } else {
          // ref가 할당된 DOM 요소가 있는지 확인
          if (ref.current) {
            // 클릭된 요소가 ref 요소 내부에 포함되지 않으면
            if (!ref.current.contains(e.target as Node)) {
              modalState.closeModal();
            } else if (
              ref.current.contains(e.target as Node) &&
              !ref1.current.contains(e.target as Node)
            ) {
              modalState.closeModal();
            }
          }
        }
      }}
      ref={ref}
    >
      <UserImage
        userImageAddress={`${authStore.userImage.address}`}
        userSex={`${authStore.sex}`}
        size={30}
      />
      <span className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
        {authStore.nickname}
      </span>
      {modalState.isOpen && (
        <section
          ref={ref1}
          onClick={(e) => e.preventDefault()}
          className="outline-primary-20 fixed right-0 top-[4rem] flex h-auto w-[20rem] cursor-default flex-col gap-y-4 rounded-2xl bg-white p-4 outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-gray2"
        >
          <div className="relative flex h-[12rem] w-full items-center justify-center p-4">
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
            className="outline-primary-20 flex items-center justify-center gap-x-2 rounded-[1rem] bg-white px-8 py-2 outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-gray3"
            onClick={() => modalState.closeModal()}
            prefetch={true}
          >
            <div className="relative h-[1.25rem] w-[1.25rem]">
              <Image
                className="aspect-square"
                src="/icons/mypage-empty-icon.svg"
                alt="mypage-empty-icon"
                fill
              />
            </div>
            마이페이지
          </Link>
          <button
            onClick={logoutHandler}
            className="rounded-2xl bg-main px-8 py-2 font-semibold text-white"
          >
            로그아웃
          </button>
        </section>
      )}
    </button>
  );
};
export default UserDropDown;
