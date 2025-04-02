"use client";

import React from "react";
import { HashSpinner } from "@/shared/ui/hashSpinner";
import { useInformationEditorStore } from "../model/informationEditorStore";
import { InformationEditorPlace } from "./InformationEditorPlace";
import { InformationEditorCategoryList } from "./InformationEditorCategoryList";
import { InformationEditorTitle } from "./InformationEditorTitle";
import { InformationEditorContent } from "./InformationEditorContent";
import { InformationEditorHashtag } from "./InformationEditorHashtag";
import { InformationEditorTip } from "./InformationEditorTip";
import { SubmitButton } from "@/shared/ui/button";
import { InformationEditorImageList } from "./InformationEditorImageList";

interface InformationEditorProps {
  text: "등록" | "수정";
  loading: boolean;
  onSubmit: () => void;
}

export const InformationEditor = ({
  text,
  loading,
  onSubmit,
}: InformationEditorProps) => {
  const { imageLoading } = useInformationEditorStore();

  return (
    <div className="flex w-full flex-col gap-10">
      <HashSpinner loading={loading} />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-black">{`정보 ${text}하기`}</h1>
        <p className="text-gray1 mt-6 font-medium">
          혼자 여행할 때 <span className="text-main">유용한 정보</span>를 다른
          솔리들과 공유해보세요!
        </p>
      </div>
      <InformationEditorTitle />
      <div className="flex flex-row items-center gap-40 max-[1024px]:gap-10 max-[744px]:flex-col max-[744px]:items-start">
        <InformationEditorPlace />
        <InformationEditorCategoryList />
      </div>
      <InformationEditorImageList />
      <InformationEditorContent />
      <InformationEditorHashtag />
      <InformationEditorTip />
      <SubmitButton
        text={text}
        className={
          imageLoading ? "bg-gray1 cursor-not-allowed hover:scale-100" : ""
        }
        onClick={onSubmit}
        disabled={loading || imageLoading}
        loading={loading}
      />
    </div>
  );
};
