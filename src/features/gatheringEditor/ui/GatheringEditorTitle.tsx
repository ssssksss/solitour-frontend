"use client";

import { useFormContext } from "react-hook-form";
import { GatheringForm } from "../model/gatheringForm";

export const GatheringEditorTitle = () => {
  const formContext = useFormContext<GatheringForm>();

  return (
    <div className="relative flex w-full shrink-0 items-center gap-x-2.5 gap-y-3 max-[400px]:flex-col max-[400px]:items-start">
      <div className="relative w-10.5 shrink-0">
        <span className="text-lg font-semibold">제목</span>
        <span className="text-main absolute -top-2 text-lg">*</span>
      </div>
      <div className="relative w-full">
        <input
          className={[
            formContext.formState.errors.title
              ? "outline-red-500"
              : "outline-[#E3E3E3]",
            "h-13 w-full rounded-[3rem] px-5 text-sm outline -outline-offset-1",
          ].join(" ")}
          {...formContext.register("title")}
          placeholder="제목을 입력하세요. (최대 50자)"
          maxLength={50}
        />
        {formContext.formState.errors.title && (
          <span className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.title.message as String}
          </span>
        )}
      </div>
    </div>
  );
};
