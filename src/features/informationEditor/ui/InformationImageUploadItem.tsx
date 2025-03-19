"use client";

import Image from "next/image";
import { MdClose } from "react-icons/md";
import { HashLoader } from "react-spinners";
import { useImageUploadItem } from "../model/useImageUploadItem";

interface InformationImageUploadItemProps {
  imageIndex: number;
}

export const InformationImageUploadItem = ({
  imageIndex,
}: InformationImageUploadItemProps) => {
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
        className="hover:border-main relative flex h-[9.375rem] w-40 cursor-pointer flex-col items-center justify-between rounded-xl border p-2"
        onDragStart={(e) => e.preventDefault()}
        onClick={() => setMainImageIndex(imageIndex)}
        onTouchEnd={() => setMainImageIndex(imageIndex)}
      >
        <div className="flex w-full flex-row justify-end">
          <MdClose
            className="bg-main z-10 cursor-pointer rounded-full p-1 text-white hover:scale-110"
            size={"1.75rem"}
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(imageIndex);
            }}
          />
        </div>
        <Image
          className="rounded-[0.625rem] object-cover"
          src={image}
          alt="image"
          fill={true}
        />
        {imageIndex === mainImageIndex && (
          <p className="bg-main z-10 mb-6 rounded-full px-3 py-[0.375rem] text-sm font-semibold text-white">
            대표 이미지
          </p>
        )}
        <div /> {/* empty tag */}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="border-main flex h-[9.375rem] w-40 items-center justify-center rounded-xl border">
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
      className={[
        `${imageIndex >= 12 ? "hidden" : ""}`,
        "hover:border-main focus:border-main flex h-[9.375rem] w-40 cursor-pointer flex-col items-center justify-center rounded-xl border",
      ].join(" ")}
      htmlFor="file"
      onClick={handleUploadItemClick}
    >
      <div className="border-main text-main flex h-12 w-12 items-center justify-center rounded-full border text-xl">
        +
      </div>
      <p className="text-gray1 pt-3 pb-[0.375rem] text-xs font-medium">
        사진 추가
      </p>
      <p className="text-gray2 text-xs font-medium">{imageIndex}/12</p>
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
