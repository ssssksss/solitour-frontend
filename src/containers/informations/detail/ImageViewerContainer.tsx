"use client";

import ImageViewer from "@/components/informations/detail/ImageViewer";
import useDragScroll from "@/hooks/useDragScroll";
import { useState } from "react";

type MyProps = {
  images: string[];
};

const ImageViewerContainer = ({ images }: MyProps) => {
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const scrollHook = useDragScroll();

  return (
    <ImageViewer
      images={images}
      mainImageIndex={mainImageIndex}
      scrollHook={scrollHook}
      setMainImageIndex={setMainImageIndex}
    />
  );
};

export default ImageViewerContainer;
