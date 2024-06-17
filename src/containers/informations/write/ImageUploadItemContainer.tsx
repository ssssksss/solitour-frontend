"use client";

import ImageUploadItem from "@/components/informations/write/ImageUploadItem";
import useEditorStore from "@/store/editorStore";
import { useRef } from "react";

type MyProps = {
  index: number;
};

const ImageUploadItemContainer = ({ index }: MyProps) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const { images, changeImage, addImage, removeImage } = useEditorStore();

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
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        changeImage(index, reader.result as string);
        addImage();
      };
    }
  };

  return (
    <ImageUploadItem
      index={index}
      image={images[index]}
      imageRef={imageRef}
      onUploadButtonClicked={onUploadButtonClicked}
      previewImage={previewImage}
      onRemove={removeImage}
    />
  );
};

export default ImageUploadItemContainer;
