"use client";

import { useState } from "react";
import { useDragAndDrop } from "../useDragAndDrop";
import useModalState from "../useModalState";
import useAuthStore from "@/stores/authStore";
import useToastifyStore from "@/stores/toastifyStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export const useMyPageUserImage = (
  userImageUrl: string,
  userSex: string | null,
) => {
  const [imageUrl, setImageUrl] = useState(userImageUrl || "");
  const [imageBase64Data, setImageBase64Data] = useState<string>("");
  const modalState = useModalState();
  const authStore = useAuthStore();
  const toastifyStore = useToastifyStore();

  const imageUpload = (imageDataUrl: string) => {
    setImageBase64Data(imageDataUrl);
    modalState.openModal(); // 이미지 편집을 위한 모달창
  };

  const handleDeleteClick = async () => {
    const response = await fetchWithAuth("/api/auth/user-image", {
      method: "DELETE",
      "Content-Type": "application/json",
    });

    if (!response.ok) {
      toastifyStore.setToastify({
        type: "success",
        message: "이미지 삭제 실패",
      });
    }

    if (response.ok) {
      const { ...prevState } = authStore;
      if (userSex == "male") {
        setImageUrl("/icons/default-male-icon.svg");
        authStore.setUser({
          ...prevState,
          userImage: {
            ...authStore.userImage,
            address: "/icons/default-male-icon.svg",
          },
        });
      } else if (userSex == "female") {
        setImageUrl("/icons/default-female-icon.svg");
        authStore.setUser({
          ...prevState,
          userImage: {
            ...authStore.userImage,
            address: "/icons/default-female-icon.svg",
          },
        });
      } else if (!userSex) {
        setImageUrl("/icons/default-user-icon.svg");
        authStore.setUser({
          ...prevState,
          userImage: {
            ...authStore.userImage,
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
