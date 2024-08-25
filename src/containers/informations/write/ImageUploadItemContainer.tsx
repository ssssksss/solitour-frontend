"use client";

import ImageUploadItem from "@/components/informations/write/ImageUploadItem";
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
  const [url, setUrl] = useState<string>("");

  const onUploadButtonClicked = () => {
    imageRef.current?.click();
  };

  const previewImage = () => {
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

      const blob = new Blob([file], { type: "image/png" });
      const fileURL = URL.createObjectURL(blob);

      setUrl(fileURL);
      changeImage(index, fileURL);
      addImage(file);
    }
  };

  const onRemove = (index: number) => {
    setEditor({
      images: editorStore.images.filter((_, i) => index !== i),
      imageFiles: editorStore.imageFiles.filter((_, i) => index !== i),
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
      onUploadButtonClicked={onUploadButtonClicked}
      previewImage={previewImage}
      setMainImageIndex={(index) => setEditor({ mainImageIndex: index })}
      onRemove={onRemove}
    />
  );
};

export default ImageUploadItemContainer;
