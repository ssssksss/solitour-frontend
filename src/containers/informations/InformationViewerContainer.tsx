"use client";

import InformationViewer from "@/components/informations/InformationViewer";
import useDragScroll from "@/hooks/useDragScroll";
import { useState } from "react";

type MyProps = {
  category: string;
  id: number;
};

const InformationViewerContainer = ({ category, id }: MyProps) => {
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const {
    listRef,
    onDragStart,
    onDragMove,
    onDragEnd,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = useDragScroll();

  return (
    <InformationViewer
      category={category}
      id={id}
      mainImageIndex={mainImageIndex}
      listRef={listRef}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      setMainImageIndex={setMainImageIndex}
    />
  );
};

export default InformationViewerContainer;
