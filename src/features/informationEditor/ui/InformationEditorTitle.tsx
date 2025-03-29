"use client";

import { useFormContext } from "react-hook-form";

export const InformationEditorTitle = () => {
  const formContext = useFormContext();

  return (
    <div className="relative flex h-13.25 flex-row items-center gap-2.5">
      <h2 className="w-10.5 text-lg font-semibold text-nowrap text-black">
        제목<span className="text-main">*</span>
      </h2>
      <input
        className={[
          formContext.formState.errors.informationTitle
            ? "border-red-500"
            : "border-gray3 hover:border-main focus:border-main",
          "h-full w-full rounded-full border bg-transparent px-5 text-sm font-medium outline-hidden",
        ].join(" ")}
        {...formContext.register("informationTitle")}
        type="text"
        placeholder="제목을 입력하세요. (최대 50자)"
        maxLength={50}
        autoComplete="off"
      />
      {formContext.formState.errors.informationTitle && (
        <p className="absolute -bottom-6 left-16 mt-1 text-xs text-red-500">
          {formContext.formState.errors.informationTitle.message as String}
        </p>
      )}
    </div>
  );
};
