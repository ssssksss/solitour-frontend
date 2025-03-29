"use client";

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
import { SubmitButton } from "@/shared/ui/button";
import { GatheringForm } from "../model/gatheringForm";

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
  const formContext = useFormContext<GatheringForm>();

  return (
    <div className="flex w-full max-w-240 flex-col">
      <HashSpinner loading={loading} />
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold">{`모임 ${text}하기`}</h1>
        <p>
          새로운 사람들과 <span className="text-main"> 모임을 만들어 </span>
          여행을 다채롭게 경험해보세요!
        </p>
      </div>
      <section className="flex w-full max-w-full flex-wrap gap-x-14 gap-y-9.5 pt-12">
        <GatheringEditorTitle />
        <div className="grid w-full gap-x-7.5 gap-y-9.5 max-[576px]:grid-cols-1 min-[576px]:grid-cols-2 min-[960px]:grid-cols-3">
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
        <SubmitButton
          text={text}
          onClick={() => {
            if (!formContext.formState.isValid) {
              formContext.trigger();
              return;
            }
            handleSubmit();
          }}
          disabled={loading}
          loading={loading}
        />
      </section>
    </div>
  );
};
