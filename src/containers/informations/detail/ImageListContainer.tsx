"use client";

import ImageList from "@/components/informations/detail/ImageList";
import useDragScroll from "@/hooks/useDragScroll";
import { useState } from "react";

interface Props {
  images: Array<Readonly<{ imageStatus: string; address: string }>>;
}

const ImageListContainer = ({ images }: Props) => {
  const scrollHook = useDragScroll();
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    images.find((image) => image.imageStatus === "썸네일")?.address ?? "",
  );
  const [viewerVisible, setViewerVisible] = useState<boolean>(false);

  return (
    <ImageList
      scrollHook={scrollHook}
      images={images}
      mainImageUrl={mainImageUrl}
      viewerVisible={viewerVisible}
      setMainImageUrl={setMainImageUrl}
      openViewer={() => setViewerVisible(true)}
      closeViewer={() => setViewerVisible(false)}
    />
  );
};

export default ImageListContainer;
