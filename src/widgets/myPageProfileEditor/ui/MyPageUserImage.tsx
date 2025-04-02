"use client";

import Image from "next/image";
import { UserImage, useUserStore } from "@/entities/user";
import { useMyPageUserImage } from "../model/useMyPageUserImage";
import { Modal } from "@/shared/ui/modal";
import { ImageCropperModal } from "./ImageCropperModal";

interface MyPageUserImageProps {
  userImageUrl: string;
  userSex: string | null;
}

export const MyPageUserImage = ({
  userImageUrl,
  userSex,
}: MyPageUserImageProps) => {
  const {
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
  } = useMyPageUserImage(userImageUrl, userSex);
  const { sex } = useUserStore();

  return (
    <article className="flex items-center justify-center pt-17 pb-21">
      <div className="group flex flex-col items-center">
        <label
          className="bg-lightgreen relative aspect-square w-27 cursor-pointer rounded-[50%] outline -outline-offset-1 outline-[#B8EDD9]"
          htmlFor="imageUpload"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDropOrInputEvent}
        >
          <UserImage userImageAddress={imageUrl} size={108} />
          <div className="absolute right-0 bottom-0 flex aspect-square w-9.5 items-center justify-center rounded-[50%] bg-[#F4F4F4]">
            <div className="relative h-5 w-5">
              <Image
                src="/icons/camera-icon.svg"
                alt="camera-icon"
                fill={true}
              />
            </div>
          </div>
          {sex !== null && (
            <button
              className="invisible absolute top-0 right-0 z-10 flex aspect-square w-4 items-center justify-center rounded-full bg-black group-hover:visible hover:bg-black/25"
              onClick={handleDeleteClick}
            >
              <Image
                src="/icons/close-icon.svg"
                alt="close-icon"
                width={8}
                height={8}
              />
            </button>
          )}
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onDropOrInputEvent}
          />
        </label>
      </div>
      <Modal isOpen={isOpen} closeModal={closeCropModal}>
        <ImageCropperModal
          imageBase64Data={imageBase64Data}
          closeCropModal={closeCropModal}
          onChangeImageUrl={handleImageUrlChange}
        />
      </Modal>
    </article>
  );
};
