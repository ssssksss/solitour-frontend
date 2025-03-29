"use client";

import Image from "next/image";
import CropperComponent from "./CropperComponent";
import { UserImage } from "@/entities/user";
import { useMyPageUserImage } from "../model/useMyPageUserImage";
import { Modal } from "@/shared/ui/modal";

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
    handleDeleteClick,
    closeCropModal,
    handleImageUrlChange,
  } = useMyPageUserImage(userImageUrl, userSex);

  return (
    <article className="flex items-center justify-center pt-[4.25rem] pb-[5.25rem]">
      <div className="group flex flex-col items-center">
        <label
          className="bg-lightgreen relative aspect-square w-[6.75rem] cursor-pointer rounded-[50%] outline -outline-offset-1 outline-[#B8EDD9]"
          htmlFor="imageUpload"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDropOrInputEvent}
        >
          <UserImage userImageAddress={imageUrl} size={108} />
          <div className="absolute right-0 bottom-0 flex aspect-square w-[2.375rem] items-center justify-center rounded-[50%] bg-[#F4F4F4]">
            <div className="relative h-5 w-5">
              <Image
                src="/icons/camera-icon.svg"
                alt="camera-icon"
                fill={true}
              />
            </div>
          </div>
          <button
            className="invisible absolute top-0 right-0 z-10 flex aspect-square w-4 items-center justify-center rounded-[50%] bg-black group-hover:visible"
            onClick={handleDeleteClick}
          >
            <Image
              src="/icons/close-icon.svg"
              alt="close-icon"
              width={8}
              height={8}
            />
          </button>
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
        <CropperComponent
          imageBase64Data={imageBase64Data}
          closeCropModal={closeCropModal}
          onChangeImageUrl={handleImageUrlChange}
        />
      </Modal>
    </article>
  );
};
