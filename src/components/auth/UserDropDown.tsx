import useModalState from "@/hooks/useModalState";
import useOutsideClick from "@/hooks/useOutsideClick";
import useAuthStore from "@/store/authStore";
import { ModalState } from "@/types/ModalState";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import UserImage from "./UserImage";

const UserDropDown = () => {
  const authStore = useAuthStore();
  const modalState = useModalState(); 
  const router = useRouter();
  const ref = useRef<any>();
  const ref1 = useRef<any>();
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
      className="flex items-center gap-x-2 w-full"
      onClick={(e) => {
        if (!modalState.isOpen) {
          modalState.openModal();
        } else {
          // ref가 할당된 DOM 요소가 있는지 확인
          if (ref.current) {
            // 클릭된 요소가 ref 요소 내부에 포함되지 않으면
            if (!ref.current.contains(e.target as Node)) {
              modalState.closeModal();
            } else if (ref.current.contains(e.target as Node) && !ref1.current.contains(e.target as Node)) {
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
      {
        modalState.isOpen &&
        <section
          ref={ref1}
          onClick={(e)=>e.preventDefault()}
          className={"fixed right-0 top-[4rem] gap-y-4 p-4 rounded-2xl h-auto bg-white w-[20rem] flex flex-col outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 outline-gray2 cursor-default"}>
          <div className="relative w-full flex justify-center h-[12rem] items-center p-4 rounded-[1rem] ">
            <Image
              src={authStore.userImage.address}
              alt={"유저 이미지"}
              width={140}
              height={140}
            />
          </div>
          <Link
            href={"/mypage?mainCategory=정보&category=owner"}
            className={"flex gap-x-2 items-center px-8 py-2 justify-center bg-white outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-gray3 outline-primary-20 rounded-[1rem]"}
            onClick={() => modalState.closeModal()}
            prefetch={true}
          >
            <div className={"relative w-[1.25rem] h-[1.25rem]"}>
              <Image
                className="aspect-square"
                src="/home/mypage-icon.svg"
                alt="signin-icon"
                fill
              />
            </div>
         마이페이지
          </Link>
          <button
            onClick={logoutHandler}
            className="px-8 py-2 bg-main rounded-2xl font-semibold text-white"
          >
        로그아웃
          </button>
        </section> 
      }
    </button>
  );
};
export default UserDropDown;