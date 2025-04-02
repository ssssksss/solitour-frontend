"use client";

import { useDragScroll } from "@/shared/lib/hooks";
import { useInformationEditorStore } from "../model/informationEditorStore";
import { InformationImageUploadItem } from "./InformationImageUploadItem";

export const InformationEditorImageList = () => {
  const { imageList } = useInformationEditorStore();
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
    <div className="flex flex-col">
      <div
        className="mb-2 flex flex-row items-center gap-4 overflow-x-auto"
        ref={listRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {imageList.map((_, index) => (
          <div key={index}>
            <InformationImageUploadItem imageIndex={index} />
          </div>
        ))}
      </div>
      <p className="text-gray1 text-sm font-medium">
        사진 최대 용량은 10MB입니다.
      </p>
    </div>
  );
};
