"use client";

import ImageUploadItem from "@/components/informations/write/ImageUploadItem";
import useAuthStore from "@/store/authStore";
import useEditorStore from "@/store/editorStore";
import React, { useState } from "react";
import { useRef } from "react";

interface Props {
  index: number;
}

const ImageUploadItemContainer = ({ index }: Props) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const { images, mainImageIndex, setEditor, changeImage, addImage } =
    useEditorStore();
  const editorStore = useEditorStore();
  const authStore = useAuthStore();
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onUploadButtonClicked = () => {
    imageRef.current?.click();
  };

  const previewImage = async () => {
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

      setLoading(true);

      const response = await fetch("/api/image/upload", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      setLoading(false);

      if (!response.ok) {
        alert("이미지 처리 중 오류가 발생하였습니다.");
        throw new Error(response.statusText);
      }

      const result: { fileUrl: string } = await response.json();

      setUrl(result.fileUrl);
      changeImage(index, result.fileUrl);
      addImage();
    }
  };

  const onRemove = (index: number) => {
    setEditor({
      images: editorStore.images.filter((_, i) => index !== i),
    });

    if (index < mainImageIndex) {
      setEditor({ mainImageIndex: mainImageIndex - 1 });
    } else if (index === mainImageIndex) {
      setEditor({ mainImageIndex: 0 });
    }

    URL.revokeObjectURL(url);
    setUrl("");
  };

  return (
    <ImageUploadItem
      index={index}
      image={images[index]}
      mainImageIndex={mainImageIndex}
      imageRef={imageRef}
      loading={loading}
      onUploadButtonClicked={onUploadButtonClicked}
      previewImage={previewImage}
      setMainImageIndex={(index) => setEditor({ mainImageIndex: index })}
      onRemove={onRemove}
    />
  );
};

export default ImageUploadItemContainer;
