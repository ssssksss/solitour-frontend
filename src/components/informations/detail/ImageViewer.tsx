import { useDragScrollType } from "@/hooks/useDragScroll";
import Image from "next/image";

type MyProps = {
  images: string[];
  mainImageIndex: number;
  scrollHook: useDragScrollType;
  setMainImageIndex: (index: number) => void;
};

const ImageViewer = ({
  images,
  mainImageIndex,
  scrollHook,
  setMainImageIndex,
}: MyProps) => {
  return (
    <div className="dark:opacity-65">
      <div className="relative h-[26.0625rem] w-full text-slate-200 max-[744px]:h-[19.125rem]">
        <Image
          className="rounded-2xl"
          src={images[mainImageIndex]}
          alt={"/background"}
          fill={true}
          style={{
            objectFit: "cover",
          }}
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
          <Image
            key={index}
            className="cursor-pointer rounded-lg"
            src={image}
            alt={"/background"}
            width={107}
            height={107}
            onClick={(e) => {
              setMainImageIndex(index);
            }}
            onTouchEnd={(e) => {
              setMainImageIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;
