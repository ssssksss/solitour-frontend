"use client";

import { useUserStore } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks";
import { useRouter } from "next/navigation";

export const useNewGatheringList = () => {
  const userStore = useUserStore();
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  const checkAccessGathering = async (e: React.MouseEvent<HTMLDivElement>) => {
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
