"use client";

import ImageViewer from "@/components/informations/detail/ImageViewer";
import { useMemo, useState } from "react";

interface Props {
  imageUrls: string[];
  closeViewer: () => void;
}

const ImageViewerContainer = ({ imageUrls, closeViewer }: Props) => {
  const [[index, direction], setIndex] = useState<number[]>([0, 0]);
  const length = useMemo(() => imageUrls.length, [imageUrls.length]);
  const variants = useMemo(
    () => ({
      enter: (direction: number) => {
        return {
          x: direction > 0 ? 1000 : -1000,
          opacity: 0,
        };
      },
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
      },
      exit: (direction: number) => {
        return {
          zIndex: 0,
          x: direction < 0 ? 1000 : -1000,
          opacity: 0,
        };
      },
    }),
    [],
  );

  return (
    <ImageViewer
      imageUrls={imageUrls}
      length={length}
      index={index}
      direction={direction}
      variants={variants}
      setIndex={setIndex}
      closeViewer={closeViewer}
    />
  );
};

export default ImageViewerContainer;
