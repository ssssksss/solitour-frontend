"use client";

import ImageViewer from "@/components/informations/detail/ImageViewer";
import useDragScroll from "@/hooks/useDragScroll";
import { useState } from "react";

interface Props {
  images: Array<Readonly<{ imageStatus: string; address: string }>>;
}

const ImageViewerContainer = ({ images }: Props) => {
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
