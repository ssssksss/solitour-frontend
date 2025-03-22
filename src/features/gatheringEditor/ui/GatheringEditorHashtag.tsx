"use client";

import { Hashtag } from "@/shared/ui/hashtag";
import { useGatheringEditorHashtag } from "../model/useGatheringEditorHashtag";

export const GatheringEditorHashtag = () => {
  const { tagList, inputTagRef, handleHashtagClick, handleEnterKey } =
    useGatheringEditorHashtag();

  return (
    <article className="flex w-full flex-col gap-8">
      <div className="flex w-full items-center gap-x-2.5 max-[360px]:flex-col max-[360px]:items-start max-[360px]:gap-y-3">
        <div className="relative w-11 shrink-0 text-lg font-semibold">태그</div>
        <div className="relative w-full">
          <input
            placeholder="태그로 키워드를 써보세요! (2 ~ 15자)"
            className="h-13 w-full rounded-[3rem] px-4 pr-12 outline -outline-offset-1 outline-[#E3E3E3]" // 오른쪽 padding 추가
            onKeyUp={(e) => handleEnterKey(e)}
            disabled={tagList.length > 9}
            maxLength={15}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "#") {
                e.preventDefault();
              }
            }}
            ref={inputTagRef}
          />
          {tagList.length > 9 && (
            <div className="absolute pl-4 text-sm text-red-500">
              해시태그는 최대 10개입니다.
            </div>
          )}
        </div>
      </div>
      <div className="flex min-h-8 flex-row flex-wrap items-center gap-1">
        {tagList.map((tag) => (
          <Hashtag
            key={tag}
            tagName={tag}
            borderColor="border-main"
            textColor="text-main"
            removable={true}
            onClick={() => handleHashtagClick(tag)}
            cursorPointer={true}
          />
        ))}
      </div>
    </article>
  );
};
