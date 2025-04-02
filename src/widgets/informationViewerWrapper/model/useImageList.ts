"use client";

import { useState } from "react";
import {
  useDragScroll,
  useModalBackHandler,
  usePreventBodyScroll,
} from "@/shared/lib/hooks";

export const useImageList = (
  imageList: { imageStatus: string; address: string }[],
) => {
  const scrollHook = useDragScroll();
  const [mainImageUrl, setMainImageUrl] = useState(
    imageList.find((image) => image.imageStatus === "썸네일")?.address ?? "",
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
