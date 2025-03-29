"use client";

import { useFormContext } from "react-hook-form";

export const InformationEditorContent = () => {
  const formContext = useFormContext();

  return (
    <div className="flex w-full flex-col">
      <textarea
        className="hover:border-main focus:border-main min-h-87.5 resize-none rounded-2xl border p-4 outline-hidden"
        {...formContext.register("informationContent")}
        placeholder="장소 방문은 어땠나요? 장소 정보 및 나의 경험을 작성해 다른 솔리들에게 도움을 주세요."
        maxLength={500}
      />
      <p className="text-gray1 pt-3 text-end text-sm font-medium">
        {formContext.getValues("informationContent").length}/500
      </p>
    </div>
  );
};
