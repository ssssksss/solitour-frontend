"use client";

import ImageViewer from "@/components/informations/detail/ImageViewer";
import { useMemo, useState } from "react";

interface Props {
  imageUrls: string[];
  closeViewer: () => void;
}

const ImageViewerContainer = ({ imageUrls, closeViewer }: Props) => {
  const [index, setIndex] = useState<number>(0);
  const length = useMemo(() => imageUrls.length, [imageUrls.length]);

  return (
    <ImageViewer
      imageUrls={imageUrls}
      length={length}
      index={index}
      setIndex={setIndex}
      closeViewer={closeViewer}
    />
  );
};

export default ImageViewerContainer;
