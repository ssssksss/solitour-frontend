"use client";

import Image from "next/image";
import React from "react";
import { useDragScroll } from "@/shared/lib/hooks";
import { HashSpinner } from "@/shared/ui/hashSpinner";
import { InformationImageUploadItem } from "./InformationImageUploadItem";
import { useInformationEditorStore } from "../model/informationEditorStore";
import { InformationEditorPlace } from "./InformationEditorPlace";
import { InformationEditorCategoryList } from "./InformationEditorCategoryList";
import { InformationEditorTitle } from "./InformationEditorTitle";
import { InformationEditorContent } from "./InformationEditorContent";
import { InformationEditorHashtag } from "./InformationEditorHashtag";
import { InformationEditorTip } from "./InformationEditorTip";

interface InformationEditorProps {
  text: "등록" | "수정";
  loading: boolean;
  handleSubmit: () => void;
}

export const InformationEditor = ({
  text,
  loading,
  handleSubmit,
}: InformationEditorProps) => {
  const {
    listRef,
    onDragStart,
    onDragMove,
    onDragEnd,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = useDragScroll();
  const { imageLoading, imageList } = useInformationEditorStore();

  return (
    <div className="flex w-full flex-col">
      <HashSpinner loading={loading} />
      <h1 className="text-3xl font-bold text-black">{`정보 ${text}하기`}</h1>
      <p className="text-gray1 mt-6 font-medium">
        혼자 여행할 때 <span className="text-main">유용한 정보</span>를 다른
        솔리들과 공유해보세요!
      </p>
      <InformationEditorTitle />
      <div className="mt-10 flex flex-row items-center gap-40 max-[1024px]:gap-10 max-[744px]:flex-col max-[744px]:items-start">
        <InformationEditorPlace />
        <InformationEditorCategoryList />
      </div>
      <div
        className="mt-10 mb-2 flex flex-row items-center gap-4 overflow-x-auto"
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
      <InformationEditorContent />
      <InformationEditorHashtag />
      <InformationEditorTip />
      <div className="flex flex-col items-end">
        <button
          className={[
            imageLoading
              ? "bg-gray1 cursor-not-allowed"
              : "bg-main hover:scale-105",
            "mt-10 mb-20 flex h-10.5 w-38 items-center justify-center rounded-full font-medium text-white shadow-sm",
          ].join(" ")}
          type="submit"
          onClick={() => handleSubmit()}
          disabled={loading || imageLoading}
        >
          {loading ? (
            <div className="flex flex-row items-center gap-3">
              <Image
                className="animate-spin"
                src="/images/loading.webp"
                alt="loading"
                width={20}
                height={20}
              />
              <p>{`${text} 중...`}</p>
            </div>
          ) : (
            <p>{`${text}하기`}</p>
          )}
        </button>
      </div>
    </div>
  );
};
