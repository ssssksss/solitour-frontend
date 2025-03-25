"use client";

import { useUserStore } from "@/entities/user";
import { fetchWithAuth } from "@/shared/api";
import { useRef } from "react";
import { useInformationEditorStore } from "./informationEditorStore";

export const useImageUploadItem = (imageIndex: number) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const {
    imageLoading,
    imageList,
    mainImageIndex,
    setInformationEditorState,
    changeImage,
    addImage,
  } = useInformationEditorStore();
  const userStore = useUserStore();

  const handleUploadItemClick = () => {
    imageRef.current?.click();
  };

  const handleImageUpload = async () => {
    if (
      imageRef.current &&
      imageRef.current.files &&
      imageRef.current.files.length >= 1
    ) {
      const file = imageRef.current.files[0];

      if (file.size > 10485760) {
        alert("사진 용량이 10MB를 초과합니다.");
        return;
      }

      const formData = new FormData();
      formData.append("id", userStore.id.toString());
      formData.append("image", file);
      formData.append("type", "INFORMATION");

      setInformationEditorState({ imageLoading: true });

      const response = await fetchWithAuth("/api/image/upload", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      setInformationEditorState({ imageLoading: false });

      if (!response.ok) {
        alert("이미지 처리 중 오류가 발생하였습니다.");
        throw new Error(response.statusText);
      }

      const result: { fileUrl: string } = await response.json();
      changeImage(imageIndex, result.fileUrl);
      addImage();
    }
  };

  const handleRemove = (index: number) => {
    if (imageLoading) {
      return;
    }

    setInformationEditorState({
      imageList: imageList.filter((_, i) => index !== i),
    });

    if (index < mainImageIndex) {
      setInformationEditorState({ mainImageIndex: mainImageIndex - 1 });
    } else if (index === mainImageIndex) {
      setInformationEditorState({ mainImageIndex: 0 });
    }
  };

  return {
    image: imageList[imageIndex],
    mainImageIndex,
    imageRef,
    loading: imageLoading,
    handleUploadItemClick,
    handleImageUpload,
    setMainImageIndex: (value: number) =>
      setInformationEditorState({ mainImageIndex: value }),
    handleRemove,
  };
};
