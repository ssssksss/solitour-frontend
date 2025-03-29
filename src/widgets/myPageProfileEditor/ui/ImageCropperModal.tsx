"use client";

import Cropper from "react-easy-crop";
import { ModalTemplate } from "@/shared/ui/modal";
import { useImageCropperModal } from "../model/useImageCropperModal";

interface ImageCropperModalProps {
  imageBase64Data: string;
  closeCropModal: () => void;
  onChangeImageUrl: (_: string) => void;
}

export const ImageCropperModal = ({
  imageBase64Data,
  closeCropModal,
  onChangeImageUrl,
}: ImageCropperModalProps) => {
  const {
    crop,
    rotation,
    zoom,
    setCrop,
    setRotation,
    setZoom,
    onCropComplete,
    showCroppedImage,
  } = useImageCropperModal(imageBase64Data, closeCropModal, onChangeImageUrl);

  return (
    <ModalTemplate
      className="flex h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] flex-col justify-between p-6"
      closeModal={closeCropModal}
    >
      <div className="relative h-[calc(100%-5rem)] w-full">
        <Cropper
          image={imageBase64Data}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1} // 자르는 비율
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape="round" // 이미지 편집 형태
          zoomWithScroll={true} // 스크롤 확대/축소 허용할지
        />
      </div>
      <div className="flex w-full">
        <button
          className="bg-main h-16 w-full rounded-lg text-white shadow-md hover:scale-101"
          onClick={showCroppedImage}
        >
          편집 완료
        </button>
      </div>
    </ModalTemplate>
  );
};
