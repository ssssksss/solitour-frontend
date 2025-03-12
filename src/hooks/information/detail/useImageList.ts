"use client";

import { useState } from "react";
import useDragScroll from "@/hooks/useDragScroll";
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import useModalBackHandler from "@/hooks/useModalBackHandler";

export const useImageList = (
  images: Array<Readonly<{ imageStatus: string; address: string }>>,
) => {
  const scrollHook = useDragScroll();
  const [mainImageUrl, setMainImageUrl] = useState(
    images.find((image) => image.imageStatus === "썸네일")?.address ?? "",
  );
  const [viewerVisible, setViewerVisible] = useState(false);

  const openViewer = () => {
    setViewerVisible(true);
  };

  const closeViewer = () => {
    window.history.back();
    setViewerVisible(false);
  };

  usePreventBodyScroll(viewerVisible);
  useModalBackHandler(viewerVisible, () => setViewerVisible(false));

  return {
    scrollHook,
    mainImageUrl,
    viewerVisible,
    setMainImageUrl,
    openViewer,
    closeViewer,
  };
};
