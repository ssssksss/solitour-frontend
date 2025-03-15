"use client";

import { useUserStore } from "@/entities/user";
import { fetchWithAuth } from "@/shared/api";
import useToastifyStore from "@/stores/toastifyStore";
import { User } from "@/entities/user/model/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useMyPageAccountDeleteModal = (
  userInfo: User,
  closeModal?: () => void,
) => {
  const [userDeleteText, setUserDeleteText] = useState("");
  const userStore = useUserStore();
  const toastifyStore = useToastifyStore();
  const router = useRouter();

  const handleUserDeleteTextChange = (value: string) => {
    setUserDeleteText(value);
  };

  const handleDeleteClick = async () => {
    const response = await fetchWithAuth(
      `/api/auth/user?type=${userInfo.provider}`,
      {
        method: "DELETE",
        "Content-Type": "application/json",
      },
    );

    if (response.ok) {
      userStore.initialize();
      toastifyStore.setToastify({
        type: "success",
        message: "회원탈퇴에 성공했습니다.",
      });
      closeModal && closeModal();
      setTimeout(() => router.replace("/"), 300);
    } else {
      toastifyStore.setToastify({
        type: "error",
        message: "회원탈퇴에 실패했습니다.",
      });
    }
  };

  return { userDeleteText, handleUserDeleteTextChange, handleDeleteClick };
};
