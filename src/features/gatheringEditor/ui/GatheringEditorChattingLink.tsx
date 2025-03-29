"use client";

import { useFormContext } from "react-hook-form";
import { GatheringForm } from "../model/gatheringForm";

export const GatheringEditorChattingLink = () => {
  const formContext = useFormContext<GatheringForm>();

  return (
    <div className="relative flex w-full shrink-0 items-center gap-2.5">
      <div className="relative w-11 shrink-0">
        <span className="text-lg font-semibold">링크</span>
        <span className="text-main absolute -top-2 text-lg">*</span>
      </div>
      <div className="relative w-full">
        <input
          className={[
            formContext.formState.errors.openChattingUrl
              ? "outline-red-500"
              : "outline-[#E3E3E3]",
            "h-13 w-full rounded-[3rem] px-4 outline -outline-offset-1",
          ].join(" ")}
          placeholder="참여 인원과 소통을 위해 오픈 채팅 링크를 추가해주세요."
          maxLength={255}
          {...formContext.register("openChattingUrl")}
          onChange={(e) => {
            formContext.setValue("openChattingUrl", e.target.value);
            formContext.trigger("openChattingUrl");
          }}
        />
        {formContext.formState.errors.openChattingUrl && (
          <span className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.openChattingUrl.message as String}
          </span>
        )}
      </div>
    </div>
  );
};
