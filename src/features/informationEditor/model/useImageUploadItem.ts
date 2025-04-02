"use client";

import { useUserStore } from "@/entities/user";
import { uploadImage } from "@/shared/api";
import { useRef } from "react";
import { useInformationEditorStore } from "./informationEditorStore";
import { useToastifyStore } from "@/shared/model";

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
  const { setToastifyState } = useToastifyStore();

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
        setToastifyState({
          type: "warning",
          message: "사진 용량이 10MB를 초과합니다.",
        });
        return;
      }

      try {
        setInformationEditorState({ imageLoading: true });
        const response = await uploadImage(file, "INFORMATION");
        changeImage(imageIndex, response.fileUrl);
        addImage();
      } catch (error) {
        setToastifyState({
          type: "error",
          message: "이미지 업로드에 실패했습니다.",
        });
      } finally {
        setInformationEditorState({ imageLoading: false });
      }
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
