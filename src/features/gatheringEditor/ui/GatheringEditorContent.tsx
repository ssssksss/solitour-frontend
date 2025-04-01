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
              ? "border-red-500"
              : "hover:border-main focus:border-main border-[#E3E3E3]",
            "min-h-70 w-full resize-none rounded-2xl border p-4 outline-none",
          ].join(" ")}
          {...formContext.register("content")}
          placeholder="어떤 모임을 만들어볼까요? 모임 정보 및 목표를 작성해 새로운 솔리들과 함께해보세요."
          maxLength={500}
        />
        <div className="flex w-full justify-end pt-3">
          {formContext.formState.errors.content && (
            <span className="absolute left-4 text-sm text-red-500">
              {formContext.formState.errors.content.message as String}
            </span>
          )}
          <p className="text-gray1 text-end text-sm font-medium">
            {formContext.getValues("content").length}/500
          </p>
        </div>
      </div>
    </article>
  );
};
