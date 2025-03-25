"use client";

import { useFormContext } from "react-hook-form";

export const DiaryEditorTitle = () => {
  const formContext = useFormContext();

  return (
    <div className="relative flex h-[3.3125rem] flex-row items-center gap-2.5">
      <h2 className="w-[2.625rem] text-lg font-semibold text-nowrap text-black">
        제목<span className="text-main">*</span>
      </h2>
      <input
        className={[
          formContext.formState.errors.title
            ? "border-red-500"
            : "border-gray3 hover:border-main focus:border-main",
          "h-full w-full rounded-full border bg-transparent pl-5 text-sm outline-hidden",
        ].join(" ")}
        {...formContext.register("title")}
        type="text"
        placeholder="제목을 입력하세요. (최대 50자)"
        maxLength={50}
      />
      {formContext.formState.errors.title && (
        <p className="absolute -bottom-6 left-16 mt-1 text-xs text-red-500">
          {formContext.formState.errors.title.message as String}
        </p>
      )}
    </div>
  );
};
