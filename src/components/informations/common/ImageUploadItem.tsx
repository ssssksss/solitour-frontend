"use client";

import { useImageUploadItem } from "@/hooks/information/common/useImageUploadItem";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { HashLoader } from "react-spinners";

interface ImageUploadItemProps {
  imageIndex: number;
}

const ImageUploadItem = ({ imageIndex }: ImageUploadItemProps) => {
  const {
    image,
    mainImageIndex,
    imageRef,
    loading,
    handleUploadItemClick,
    handleImageUpload,
    setMainImageIndex,
    handleRemove,
  } = useImageUploadItem(imageIndex);

  if (image !== "") {
    return (
      <div
        className="relative flex h-[9.375rem] w-40 cursor-pointer flex-col items-center justify-between rounded-xl border-[0.0625rem] p-2 hover:border-main"
        onDragStart={(e) => e.preventDefault()}
        onClick={() => setMainImageIndex(imageIndex)}
        onTouchEnd={() => setMainImageIndex(imageIndex)}
      >
        <div className="flex w-full flex-row justify-end">
          <MdClose
            className="z-10 cursor-pointer rounded-full bg-main p-1 text-white hover:scale-110"
            size={"1.75rem"}
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(imageIndex);
            }}
          />
        </div>
        <Image
          className="rounded-[0.625rem]"
          src={image}
          alt="image"
          fill={true}
          style={{ objectFit: "cover" }}
        />
        {imageIndex === mainImageIndex && (
          <p className="z-10 mb-6 rounded-full bg-main px-3 py-[0.375rem] text-sm font-semibold text-white">
            대표 이미지
          </p>
        )}
        <div /> {/* empty tag */}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-[9.375rem] w-40 items-center justify-center rounded-xl border-[0.0625rem] border-main">
        <HashLoader
          color="#00B488"
          loading={loading}
          cssOverride={{ display: "block", margin: "0 auto" }}
        />
      </div>
    );
  }

  return (
    <label
      className={`${imageIndex >= 12 ? "hidden" : ""} flex h-[9.375rem] w-40 cursor-pointer flex-col items-center justify-center rounded-xl border-[0.0625rem] hover:border-main focus:border-main`}
      htmlFor="file"
      onClick={handleUploadItemClick}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-[0.0625rem] border-main text-xl text-main">
        +
      </div>
      <p className="pb-[0.375rem] pt-3 text-xs font-medium text-gray1">
        사진 추가
      </p>
      <p className="text-xs font-medium text-gray2">{imageIndex}/12</p>
      <input
        className="hidden"
        type="file"
        id="photo"
        name="photo"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageRef}
      />
    </label>
  );
};

export default ImageUploadItem;
