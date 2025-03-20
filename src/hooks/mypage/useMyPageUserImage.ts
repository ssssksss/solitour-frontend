"use client";

import { useState } from "react";
import { useDragAndDrop, useModalState } from "@/shared/lib/hooks";
import { useUserStore } from "@/entities/user";
import { fetchWithAuth } from "@/shared/api";
import { useToastifyStore } from "@/shared/model/toastifyStore";

export const useMyPageUserImage = (
  userImageUrl: string,
  userSex: string | null,
) => {
  const [imageUrl, setImageUrl] = useState(userImageUrl || "");
  const [imageBase64Data, setImageBase64Data] = useState<string>("");
  const modalState = useModalState();
  const userStore = useUserStore();
  const toastifyStore = useToastifyStore();

  const imageUpload = (imageDataUrl: string) => {
    setImageBase64Data(imageDataUrl);
    modalState.openModal(); // 이미지 편집을 위한 모달창
  };

  const handleDeleteClick = async () => {
    const response = await fetchWithAuth("/api/auth/user-image", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      toastifyStore.setToastifyState({
        type: "success",
        message: "이미지 삭제 실패",
      });
    }

    if (response.ok) {
      const { ...prevState } = userStore;
      if (userSex == "male") {
        setImageUrl("/icons/default-male-icon.svg");
        userStore.setUserState({
          ...prevState,
          userImage: {
            ...userStore.userImage,
            address: "/icons/default-male-icon.svg",
          },
        });
      } else if (userSex == "female") {
        setImageUrl("/icons/default-female-icon.svg");
        userStore.setUserState({
          ...prevState,
          userImage: {
            ...userStore.userImage,
            address: "/icons/default-female-icon.svg",
          },
        });
      } else if (!userSex) {
        setImageUrl("/icons/default-user-icon.svg");
        userStore.setUserState({
          ...prevState,
          userImage: {
            ...userStore.userImage,
            address: "/icons/default-user-icon.svg",
          },
        });
      }
    }
  };

  const closeCropModal = () => {
    setImageBase64Data("");
    modalState.closeModal();
  };

  const handleImageUrlChange = (url: string) => {
    setImageUrl(url);
  };

  const { onDragEnter, onDragLeave, onDragOver, onDropOrInputEvent } =
    useDragAndDrop({ imageUpload });

  return {
    imageUrl,
    imageBase64Data,
    modalState,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDropOrInputEvent,
    handleDeleteClick,
    closeCropModal,
    handleImageUrlChange,
  };
};
