import { useModalState, useOutsideClick } from "@/shared/lib/hooks";
import useAuthStore from "@/stores/authStore";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export const useUserDropDown = () => {
  const authStore = useAuthStore();
  const modalState = useModalState();
  const router = useRouter();
  const outside = useRef<HTMLDivElement | null>(null);
  const inside = useRef<HTMLElement | null>(null);

  const handleLogout = async () => {
    // api로 로그아웃 요청해서 쿠키 제거
    const response = await fetch("/api/auth/logout", { method: "POST" });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    authStore.initialize();
    router.push("/");
    router.refresh();
  };

  useOutsideClick(outside, () => {
    modalState.closeModal();
  });

  return { authStore, modalState, outside, inside, handleLogout };
};
