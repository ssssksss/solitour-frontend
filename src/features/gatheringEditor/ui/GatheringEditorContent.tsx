"use client";

import { useFormContext } from "react-hook-form";
import { GatheringForm } from "../model/gatheringForm";

export const GatheringEditorContent = () => {
  const formContext = useFormContext<GatheringForm>();

  return (
    <article className="flex w-full flex-col">
      <div className="relative w-full">
        <textarea
          className={[
            formContext.formState.errors.content
              ? "outline-red-500"
              : "outline-[#E3E3E3]",
            "min-h-[17.5rem] w-full resize-none rounded-[1rem] p-6 outline -outline-offset-1",
          ].join(" ")}
          placeholder="어떤 모임을 만들어볼까요? 모임 정보 및 목표를 작성해 새로운 솔리들과 함께해보세요."
          {...formContext.register("content")}
          onChange={(e) => {
            formContext.setValue("content", e.target.value);
            formContext.trigger("content");
          }}
          maxLength={500}
        />
        <div className="flex w-full justify-end pt-[0.75rem]">
          {formContext.formState.errors.content && (
            <span className="absolute left-4 text-sm text-red-500">
              {formContext.formState.errors.content.message as String}
            </span>
          )}
          <span
            className={`${formContext.getValues("content").length >= 500 && "text-red-600"}`}
          >
            {formContext.getValues("content").length} / 500
          </span>
        </div>
      </div>
    </article>
  );
};
