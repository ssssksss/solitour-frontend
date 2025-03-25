import { useUserStore } from "@/entities/user";
import { useModal, useOutsideClick } from "@/shared/lib/hooks";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export const useUserDropDown = () => {
  const userStore = useUserStore();
  const router = useRouter();
  const outside = useRef<HTMLDivElement | null>(null);
  const inside = useRef<HTMLElement | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleLogout = async () => {
    // api로 로그아웃 요청해서 쿠키 제거
    const response = await fetch("/api/auth/logout", { method: "POST" });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    userStore.initialize();
    router.push("/");
    router.refresh();
  };

  useOutsideClick(outside, () => {
    closeModal();
  });

  return {
    userStore,
    outside,
    inside,
    isOpen,
    openModal,
    closeModal,
    handleLogout,
  };
};
