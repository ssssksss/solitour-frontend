"use client";

import { Hashtag } from "@/shared/ui/hashtag";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

export const InformationEditorHashtag = () => {
  const formContext = useFormContext();
  const inputTagRef = useRef<HTMLInputElement>(null);

  const handleHashtagChange = () => {
    const hashtag = inputTagRef.current?.value.trim() ?? "";
    if (hashtag.length < 2) {
      return;
    }

    const hashtags = formContext.getValues("hashtags");
    if (!hashtags.includes(hashtag)) {
      hashtags.push(hashtag);
    }
    formContext.setValue("hashtags", hashtags);
    formContext.trigger("hashtags");
    (inputTagRef.current as HTMLInputElement).value = "";
  };

  return (
    <div className="flex flex-row items-start gap-7 max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-2">
      <h2 className="flex w-44 flex-row items-center pt-3 text-lg font-bold text-nowrap text-black">
        해시태그<span className="text-main">*</span>
      </h2>
      <div className="relative flex w-full flex-col gap-2">
        <input
          className={[
            formContext.getValues("hashtags").length >= 10
              ? "bg-gray-100/25"
              : "bg-transparent",
            formContext.formState.errors.hashtags
              ? "border-red-500"
              : "border-gray3 hover:border-main focus:border-main",
            "h-[3.3125rem] w-full rounded-3xl border py-2 pl-5 text-sm font-medium outline-hidden hover:border-b",
          ].join(" ")}
          placeholder="태그로 키워드를 써보세요! (2 ~ 15자)"
          disabled={formContext.getValues("hashtags").length >= 10}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleHashtagChange();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "#" || e.key === " ") {
              e.preventDefault();
              e.persist();
            } else if (
              e.key !== "Backspace" &&
              inputTagRef.current !== null &&
              inputTagRef.current.value.length >= 15
            ) {
              e.preventDefault();
              e.persist();
              inputTagRef.current.value = inputTagRef.current.value.slice(
                0,
                15,
              );
            }
          }}
          ref={inputTagRef}
        />
        {formContext.formState.errors.hashtags && (
          <p className="absolute bottom-5 left-4 text-xs font-medium text-red-500">
            {formContext.formState.errors.hashtags.message as String}
          </p>
        )}
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-1 flex-row flex-wrap items-center gap-2 overflow-auto py-1 pl-5">
            {formContext
              .getValues("hashtags")
              .map((hashtag: string, index: number) => (
                <Hashtag
                  key={index}
                  tagName={hashtag}
                  borderColor="border-main"
                  textColor="text-main"
                  cursorPointer={true}
                  hover="hover:scale-105"
                  removable={true}
                  onClick={() => {
                    const hashtags: string[] =
                      formContext.getValues("hashtags");
                    const filteredHashtags = hashtags.filter(
                      (_, i) => index !== i,
                    );
                    formContext.setValue("hashtags", filteredHashtags);
                    formContext.trigger("hashtags");
                  }}
                />
              ))}
          </div>
          <button
            className="text-gray1 hover:text-main h-9 text-sm font-medium"
            type="button"
            onClick={handleHashtagChange}
          >
            <span className="text-main">+</span>
            {" 해시태그 추가"}
          </button>
        </div>
      </div>
    </div>
  );
};
