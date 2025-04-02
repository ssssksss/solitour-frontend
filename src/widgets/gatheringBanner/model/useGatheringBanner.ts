"use client";

import { useUserStore } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks";
import { useRouter } from "next/navigation";

export const useGatheringBanner = () => {
  const userStore = useUserStore();
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();

  const checkAccessGathering = async (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    if (userStore.id > 0 && (!userStore.sex || !userStore.age)) {
      e.preventDefault();
      openModal();
    }
    if (userStore.id < 1) {
      e.preventDefault();
      router.push("/auth/signin");
    }
  };

  return { isOpen, closeModal, checkAccessGathering };
};
