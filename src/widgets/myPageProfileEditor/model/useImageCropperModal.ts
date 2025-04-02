"use client";

import { useState } from "react";
import { getCroppedImage } from "./getCroppedImage";
import { useUserStore } from "@/entities/user";

export const useImageCropperModal = (
  imageBase64Data: string,
  closeCropModal: () => void,
  onChangeImageUrl: (_: string) => void,
) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const { userImage, setUserState } = useUserStore();

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    if (!imageBase64Data || !croppedAreaPixels) return;

    const croppedImage = await getCroppedImage(
      imageBase64Data,
      croppedAreaPixels,
      rotation,
    );
    onChangeImageUrl(croppedImage as string);
    setUserState({
      userImage: {
        ...userImage,
        address: croppedImage!,
      },
    });
    closeCropModal();
  };

  return {
    crop,
    rotation,
    zoom,
    setCrop,
    setRotation,
    setZoom,
    onCropComplete,
    showCroppedImage,
  };
};
