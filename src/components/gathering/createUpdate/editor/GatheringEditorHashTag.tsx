"use client";

import { Hashtag } from "@/shared/ui/hashtag";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const GatheringEditorHashTag = () => {
  const formContext = useFormContext();
  const [tags, setTags] = useState<string[]>(
    formContext.getValues("hashtags") ? formContext.getValues("hashtags") : [],
  );
  const inputTagRef = useRef<HTMLInputElement>(null);

  // 태그 클릭해서 지울 때
  const deleteTagHandler = (tagName: string) => {
    setTags((prev) => prev.filter((i: string) => i !== tagName));
  };

  // 태그 입력시 ,나 Enter로 태그블록 만들어 주는 기능
  const onChangeHashTagHandler = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    // Enter 키가 눌렸을 때의 처리
    if ("key" in e && e.key === "Enter") {
      const tempTag = (inputTagRef.current as HTMLInputElement).value
        .replace(/,$/, "")
        .trim();
      if (tempTag === "") return;
      if (tempTag.length < 2) {
        (inputTagRef.current as HTMLInputElement).value = "";
        return;
      }
      setTags((prev) => Array.from(new Set([...prev, tempTag])));
      (inputTagRef.current as HTMLInputElement).value = "";
      formContext.setValue("hashtags", Array.from(new Set([...tags, tempTag])));
      formContext.trigger("hashtags");
    }

    // 특정 버튼이 클릭되었을 때의 처리
    if ("type" in e && e.type === "click") {
      // 예: 특정 버튼의 id가 'addTagButton'인 경우
      const tempTag = (inputTagRef.current as HTMLInputElement).value
        .replace(/,$/, "")
        .trim();
      if (tempTag === "") return;
      if (tempTag.length < 2) {
        (inputTagRef.current as HTMLInputElement).value = "";
        return;
      }
      setTags((prev) => Array.from(new Set([...prev, tempTag])));
      (inputTagRef.current as HTMLInputElement).value = "";
      formContext.setValue("hashtags", Array.from(new Set([...tags, tempTag])));
      formContext.trigger("hashtags");
    }
  };

  return (
    <article className="flex w-full flex-col gap-8">
      <div className="flex w-full items-center gap-x-2.5 max-[360px]:flex-col max-[360px]:items-start max-[360px]:gap-y-3">
        <div className="relative w-[2.75rem] shrink-0 text-lg font-semibold">
          태그
        </div>
        <div className="relative w-full">
          <input
            placeholder="태그로 키워드를 써보세요! (2 ~ 15자)"
            className="h-[3.25rem] w-full rounded-[3rem] px-[1rem] pr-[3rem] outline -outline-offset-1 outline-[#E3E3E3]" // 오른쪽 padding 추가
            onKeyUp={onChangeHashTagHandler}
            disabled={tags.length > 9}
            maxLength={15}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "#") {
                e.preventDefault();
              }
            }}
            ref={inputTagRef}
          />
          {tags.length > 9 && (
            <div className="absolute pl-4 text-sm text-red-500">
              해시태그는 최대 10개입니다.
            </div>
          )}
        </div>
      </div>
      <div className="flex min-h-8 flex-row flex-wrap items-center gap-1">
        {tags.map((tag) => (
          <Hashtag
            key={tag}
            tagName={tag}
            borderColor="border-main"
            textColor="text-main"
            removable={true}
            onClick={() => deleteTagHandler(tag)}
            cursorPointer={true}
          />
        ))}
      </div>
    </article>
  );
};

export default GatheringEditorHashTag;
