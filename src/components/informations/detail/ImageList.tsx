"use client";

import Image from "next/image";
import { useImageList } from "@/hooks/information/detail/useImageList";
import ImageViewer from "./ImageViewer";

interface ImageListProps {
  images: Array<Readonly<{ imageStatus: string; address: string }>>;
}

const ImageList = ({ images }: ImageListProps) => {
  const {
    scrollHook,
    mainImageUrl,
    viewerVisible,
    setMainImageUrl,
    openViewer,
    closeViewer,
  } = useImageList(images);

  return (
    <div>
      {viewerVisible && (
        <ImageViewer
          imageUrls={[
            mainImageUrl,
            ...images
              .filter((image) => image.address !== mainImageUrl)
              .map((image) => image.address),
          ]}
          closeViewer={closeViewer}
        />
      )}
      <div className="relative h-[26.0625rem] w-full max-[744px]:h-[19.125rem]">
        <Image
          className="hover:border-main cursor-pointer rounded-2xl border"
          src={mainImageUrl}
          alt="mainImage"
          fill={true}
          style={{ objectFit: "cover" }}
          onClick={() => openViewer()}
        />
      </div>
      <div
        className="flex flex-row items-center gap-[0.875rem] overflow-x-auto pt-[0.875rem]"
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
        {images.map((image, index) => (
          <div
            key={index}
            className="relative min-h-[6.6875rem] min-w-[6.6875rem] rounded-lg border"
            onClick={() => setMainImageUrl(image.address)}
            onTouchEnd={() => setMainImageUrl(image.address)}
          >
            <Image
              className="cursor-pointer rounded-[0.4375rem]"
              src={image.address}
              alt="subImage"
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
