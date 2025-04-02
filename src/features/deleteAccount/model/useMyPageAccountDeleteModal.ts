"use client";

import { User, useUserStore } from "@/entities/user";
import { useToastifyStore } from "@/shared/model";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteAccount } from "../api/account";

export const useMyPageAccountDeleteModal = (
  userInfo: User,
  closeModal: () => void,
) => {
  const [userDeleteText, setUserDeleteText] = useState("");
  const { initialize } = useUserStore();
  const { setToastifyState } = useToastifyStore();
  const router = useRouter();

  const handleUserDeleteTextChange = (value: string) => {
    setUserDeleteText(value);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteAccount(userInfo.provider);

      initialize();
      setToastifyState({
        type: "success",
        message: "회원 탈퇴에 성공했습니다.",
      });
      closeModal();
      setTimeout(() => router.replace("/"), 300);
    } catch (error) {
      setToastifyState({
        type: "error",
        message: "회원 탈퇴에 실패했습니다.",
      });
    }
  };

  return { userDeleteText, handleUserDeleteTextChange, handleDeleteClick };
};
