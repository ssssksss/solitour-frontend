"use client";

import useAuthStore from "@/stores/authStore";
import useEditorStore from "@/stores/editorStore";
import { fetchWithAuth } from "@/shared/api/fetchWithAuth";
import { useRef } from "react";

export const useImageUploadItem = (imageIndex: number) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const { images, mainImageIndex, setEditor, changeImage, addImage } =
    useEditorStore();
  const editorStore = useEditorStore();
  const authStore = useAuthStore();

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
      formData.append("id", authStore.id.toString());
      formData.append("image", file);
      formData.append("type", "INFORMATION");

      editorStore.setEditor({ imageLoading: true });

      const response = await fetchWithAuth("/api/image/upload", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      editorStore.setEditor({ imageLoading: false });

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
    if (editorStore.imageLoading) {
      return;
    }

    setEditor({
      images: editorStore.images.filter((_, i) => index !== i),
    });

    if (index < mainImageIndex) {
      setEditor({ mainImageIndex: mainImageIndex - 1 });
    } else if (index === mainImageIndex) {
      setEditor({ mainImageIndex: 0 });
    }
  };

  return {
    image: images[imageIndex],
    mainImageIndex,
    imageRef,
    loading: editorStore.imageLoading,
    handleUploadItemClick,
    handleImageUpload,
    setMainImageIndex: (value: number) => setEditor({ mainImageIndex: value }),
    handleRemove,
  };
};
