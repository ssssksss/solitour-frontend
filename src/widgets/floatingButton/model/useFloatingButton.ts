"use client";

import useAuthStore from "@/stores/authStore";
import { useRef, useState } from "react";
import useModalState from "../../../shared/lib/hooks/useModalState";
import { useRouter } from "next/navigation";
import useOutsideClick from "../../../shared/lib/hooks/useOutsideClick";

export const useFloatingButton = () => {
  const [visible, setVisible] = useState(false);
  const outside = useRef<HTMLDivElement>(null);
  const authStore = useAuthStore();
  const modalState = useModalState();
  const router = useRouter();

  const handleWriteButtonClick = () => {
    setVisible(!visible);
  };

  const handleGatheringClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleWriteButtonClick();
    if (authStore.id > 0 && (!authStore.sex || !authStore.age)) {
      e.preventDefault();
      modalState.openModal();
    }
    if (authStore.id < 1) {
      e.preventDefault();
      router.push("/auth/signin");
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useOutsideClick(outside, () => {
    handleWriteButtonClick();
  });

  return {
    outside,
    visible,
    modalState,
    handleScrollToTop,
    handleWriteButtonClick,
    handleGatheringClick,
  };
};
