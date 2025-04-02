"use client";

import dynamic from "next/dynamic";
import { HashSpinner } from "@/shared/ui/hashSpinner";
import { QuillEditorSkeleton } from "./QuillEditorSkeleton";
import { SubmitButton } from "@/shared/ui/button";
import { DiaryEditorTitle } from "./DiaryEditorTitle";
import { DiaryEditorDate } from "./DiaryEditorDate";
import { DiaryEditorAddress } from "./DiaryEditorAddress";
import { DiaryEditorMoodLevel } from "./DiaryEditorMoodLevel";

const QuillEditor = dynamic(
  () => import("./QuillEditor").then((mod) => mod.QuillEditor),
  {
    ssr: false,
    loading: () => <QuillEditorSkeleton />,
  },
);

interface DiaryEditorProps {
  text: "등록" | "수정";
  loading: boolean;
  onSubmit: () => void;
}

export const DiaryEditor = ({ text, loading, onSubmit }: DiaryEditorProps) => {
  return (
    <div className="flex w-full flex-col gap-10">
      <HashSpinner loading={loading} />
      <h1 className="text-3xl font-bold text-black">{`일기 ${text}하기`}</h1>
      <p className="text-gray1 mt-6">
        새로운 <span className="text-main">경험을 기록</span>하고 나만의
        추억카드를 만들어보세요!
      </p>
      <DiaryEditorTitle />
      <div className="flex flex-row items-center gap-40 max-[1024px]:flex-col max-[1024px]:items-start max-[1024px]:gap-10">
        <DiaryEditorDate />
        <DiaryEditorAddress />
      </div>
      <DiaryEditorMoodLevel />
      <QuillEditor />
      <SubmitButton
        text={text}
        onClick={onSubmit}
        disabled={loading}
        loading={loading}
      />
    </div>
  );
};
