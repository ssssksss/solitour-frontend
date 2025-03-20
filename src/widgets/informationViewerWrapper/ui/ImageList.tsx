"use client";

import Image from "next/image";
import { useImageList } from "../model/useImageList";
import { ImageViewer } from "./ImageViewer";

interface ImageListProps {
  imageList: { imageStatus: string; address: string }[];
}

export const ImageList = ({ imageList }: ImageListProps) => {
  const {
    scrollHook,
    mainImageUrl,
    viewerVisible,
    setMainImageUrl,
    openViewer,
    closeViewer,
  } = useImageList(imageList);

  return (
    <div>
      {viewerVisible && (
        <ImageViewer
          imageUrls={[
            mainImageUrl,
            ...imageList
              .filter((image) => image.address !== mainImageUrl)
              .map((image) => image.address),
          ]}
          closeViewer={closeViewer}
        />
      )}
      <div className="relative h-[26.0625rem] w-full max-[744px]:h-[19.125rem]">
        <Image
          className="hover:border-main cursor-pointer rounded-2xl border object-cover"
          src={mainImageUrl}
          alt="mainImage"
          fill={true}
          onClick={() => openViewer()}
        />
      </div>
      <div
        className="flex flex-row items-center gap-3.5 overflow-x-auto pt-3.5"
        ref={scrollHook.listRef}
        onMouseDown={(e) => {
          e.preventDefault();
          scrollHook.onDragStart(e);
        }}
        onMouseMove={scrollHook.onDragMove}
        onMouseUp={scrollHook.onDragEnd}
        onMouseLeave={scrollHook.onDragEnd}
        onTouchStart={scrollHook.onTouchStart}
        onTouchMove={scrollHook.onTouchMove}
        onTouchEnd={scrollHook.onTouchEnd}
      >
        {imageList.map((image, index) => (
          <div
            key={index}
            className="relative min-h-[6.6875rem] min-w-[6.6875rem] rounded-lg border"
            onClick={() => setMainImageUrl(image.address)}
            onTouchEnd={() => setMainImageUrl(image.address)}
          >
            <Image
              className="cursor-pointer rounded-[0.4375rem] object-cover"
              src={image.address}
              alt="subImage"
              fill={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
