"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";

export const DiaryEditorMoodLevel = () => {
  const formContext = useFormContext();

  return (
    <div
      className={[
        formContext.formState.errors.moodLevels
          ? "border-red-500"
          : "border-gray3",
        "relative flex flex-col gap-5 rounded-2xl border pt-6 pb-3.5",
      ].join(" ")}
    >
      <h2 className="pl-6 text-lg font-semibold text-black">
        하루 기분은 어땠나요?
      </h2>
      <div className="flex flex-wrap items-center">
        {["최고", "좋아", "무난", "슬퍼", "화나"].map((value, index) => (
          <button
            key={value}
            className={[
              formContext.getValues("moodLevels") === index + 1
                ? "bg-lightgreen text-main"
                : "text-gray1",
              "hover:bg-lightgreen hover:text-main flex h-23 w-26 flex-col items-center justify-between py-2.25 text-[0.9375rem]",
            ].join(" ")}
            onClick={() => {
              formContext.setValue("moodLevels", index + 1);
              formContext.trigger("moodLevels");
            }}
          >
            <div className="relative h-10 w-8">
              <Image
                className="object-contain"
                src={`/icons/mood-icon${index + 1}.svg`}
                alt="mood-icon"
                fill={true}
              />
            </div>
            <p>{value}</p>
          </button>
        ))}
      </div>
      {formContext.formState.errors.moodLevels && (
        <p className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
          {formContext.formState.errors.moodLevels.message as String}
        </p>
      )}
    </div>
  );
};
