"use client";

import ImageUploadItem from "@/components/informations/write/ImageUploadItem";
import useEditorStore from "@/store/editorStore";
import { useRef } from "react";

interface Props {
  index: number;
}

const ImageUploadItemContainer = ({ index }: Props) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const { images, mainImageIndex, setEditor, changeImage, addImage } =
    useEditorStore();
  const editorStore = useEditorStore();

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
        changeImage(index, reader.result as string); // Base64 Encoded String
        addImage(file);
      };
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
