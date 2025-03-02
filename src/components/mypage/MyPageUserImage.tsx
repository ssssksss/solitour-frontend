"use client";

import Image from "next/image";
import UserImage from "../auth/UserImage";
import CropperComponent from "../common/cropper/CropperComponent";
import { Modal } from "../common/modal/Modal";
import { useMyPageUserImage } from "@/hooks/mypage/useMyPageUserImage";

interface MyPageUserImageProps {
  userImageUrl: string;
  userSex: string | null;
}

const MyPageUserImage = ({ userImageUrl, userSex }: MyPageUserImageProps) => {
  const {
    imageUrl,
    imageBase64Data,
    modalState,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDropOrInputEvent,
    handleDeleteClick,
    closeCropModal,
    handleImageUrlChange,
  } = useMyPageUserImage(userImageUrl, userSex);

  return (
    <article className="flex items-center justify-center pb-[5.25rem] pt-[4.25rem]">
      <div className="group flex flex-col items-center">
        <label
          className="relative aspect-square w-[6.75rem] cursor-pointer rounded-[50%] bg-lightGreen outline outline-[1px] outline-offset-[-1px] outline-[#B8EDD9]"
          htmlFor={"imageUpload"}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDropOrInputEvent}
        >
          <UserImage userImageAddress={imageUrl} userSex={userSex} size={108} />
          <div className="absolute bottom-0 right-0 flex aspect-square w-[2.375rem] items-center justify-center rounded-[50%] bg-[#F4F4F4]">
            <div className="relative h-[1.25rem] w-[1.25rem]">
              <Image
                src="/icons/camera-icon.svg"
                alt="camera-icon"
                fill={true}
              />
            </div>
          </div>
          <button
            className="invisible absolute right-0 top-0 z-10 flex aspect-square w-[1rem] items-center justify-center rounded-[50%] bg-black group-hover:visible"
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
      <Modal modalState={modalState}>
        <CropperComponent
          imageBase64Data={imageBase64Data}
          closeCropModal={closeCropModal}
          onChangeImageUrl={handleImageUrlChange}
        />
      </Modal>
    </article>
  );
};
export default MyPageUserImage;
