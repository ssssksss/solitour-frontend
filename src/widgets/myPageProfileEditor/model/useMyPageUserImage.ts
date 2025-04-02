"use client";

import { useState } from "react";
import { useDragAndDrop, useModal } from "@/shared/lib/hooks";
import { deleteUserImage, useUserStore } from "@/entities/user";
import { useToastifyStore } from "@/shared/model";

export const useMyPageUserImage = (
  userImageUrl: string,
  userSex: string | null,
) => {
  const [imageUrl, setImageUrl] = useState(userImageUrl || "");
  const [imageBase64Data, setImageBase64Data] = useState<string>("");
  const { isOpen, openModal, closeModal } = useModal();
  const userStore = useUserStore();
  const { setToastifyState } = useToastifyStore();

  const imageUpload = (imageDataUrl: string) => {
    setImageBase64Data(imageDataUrl);
    openModal();
  };

  const handleDeleteClick = async () => {
    try {
      await deleteUserImage();

      const image =
        userSex === "male"
          ? "/icons/default-male-icon.svg"
          : userSex === "famale"
            ? "/icons/default-female-icon.svg"
            : "/icons/default-user-icon.svg";

      setImageUrl(image);
      userStore.setUserState({
        userImage: {
          ...userStore.userImage,
          address: image,
        },
      });
    } catch (error) {
      setToastifyState({
        type: "error",
        message: "이미지 삭제 실패",
      });
    }
  };

  const closeCropModal = () => {
    setImageBase64Data("");
    closeModal();
  };

  const handleImageUrlChange = (url: string) => {
    setImageUrl(url);
  };

  const { onDragEnter, onDragLeave, onDragOver, onDropOrInputEvent } =
    useDragAndDrop({ imageUpload });

  return {
    imageUrl,
    imageBase64Data,
    isOpen,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDropOrInputEvent,
    closeCropModal,
    handleDeleteClick,
    handleImageUrlChange,
  };
};
