"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { HashSpinner } from "@/shared/ui/hashSpinner";
import { GatheringEditorPeriod } from "./GatheringEditorPeriod";
import { GatheringEditorHashtag } from "./GatheringEditorHashtag";
import { GatheringEditorTime } from "./GatheringEditorTime";
import { GatheringEditorPlace } from "./GatheringEditorPlace";
import { GatheringEditorParticipantsFilter } from "./GatheringEditorParticipantsFilter";
import { GatheringEditorDeadline } from "./GatheringEditorDeadline";
import { GatheringEditorTitle } from "./GatheringEditorTitle";
import { GatheringEditorContent } from "./GatheringEditorContent";
import { GatheringEditorCategoryList } from "./GatheringEditorCategoryList";
import { GatheringEditorChattingLink } from "./GatheringEditorChattingLink";

interface GatheringEditorProps {
  text: "등록" | "수정";
  loading: boolean;
  handleSubmit: () => void;
}

export const GatheringEditor = ({
  text,
  loading,
  handleSubmit,
}: GatheringEditorProps) => {
  const formContext = useFormContext();

  return (
    <div className="flex w-full max-w-[60rem] flex-col">
      <HashSpinner loading={loading} />
      <div className="flex flex-col gap-[1.5rem]">
        <h1 className="text-3xl font-semibold">{`모임 ${text}하기`}</h1>
        <p>
          새로운 사람들과 <span className="text-main"> 모임을 만들어 </span>
          여행을 다채롭게 경험해보세요!
        </p>
      </div>
      <section className="flex w-full max-w-full flex-wrap gap-x-[3.5rem] gap-y-[2.375rem] pt-[3rem]">
        <GatheringEditorTitle />
        <div className="grid w-full gap-x-[1.875rem] gap-y-[2.375rem] max-[576px]:grid-cols-1 min-[576px]:grid-cols-2 min-[960px]:grid-cols-3">
          <GatheringEditorPeriod />
          <GatheringEditorPlace />
          <GatheringEditorTime />
          <GatheringEditorDeadline />
          <GatheringEditorCategoryList />
          <GatheringEditorParticipantsFilter />
        </div>
        <GatheringEditorContent />
        <GatheringEditorChattingLink />
        <GatheringEditorHashtag />
        <div className="flex w-full justify-end">
          <button
            className={`disabled:bg-gray1 flex h-[3rem] w-[9.5rem] flex-row items-center justify-center rounded-[2rem] px-[1rem] py-[.5rem] text-white ${!formContext.formState.isValid ? "bg-gray1" : "bg-main hover:scale-105"}`}
            onClick={() => {
              if (!formContext.formState.isValid) {
                formContext.trigger();
                return;
              }
              handleSubmit();
            }}
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
                {`${text} 중...`}
              </div>
            ) : (
              <p>{`${text}하기`}</p>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
