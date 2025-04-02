"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal, useOutsideClick } from "@/shared/lib/hooks";
import { useUserStore } from "@/entities/user";

export const useFloatingButton = () => {
  const [visible, setVisible] = useState(false);
  const outside = useRef<HTMLDivElement>(null);
  const userStore = useUserStore();
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();

  const handleWriteButtonClick = () => {
    setVisible(!visible);
  };

  const handleGatheringClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleWriteButtonClick();
    if (userStore.id > 0 && (!userStore.sex || !userStore.age)) {
      e.preventDefault();
      openModal();
    }
    if (userStore.id < 1) {
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
    isOpen,
    closeModal,
    handleScrollToTop,
    handleWriteButtonClick,
    handleGatheringClick,
  };
};
