"use client";

import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { TiLocation } from "react-icons/ti";
import { Diary } from "../model/diary";
import { FEELING_STATUS } from "../config/feelingStatus";
import { useCardFlipAnimation } from "../model/useCardFlipAnimation";

interface DiaryCardProps {
  diary: Diary;
}

export const DiaryCard = ({ diary }: DiaryCardProps) => {
  const { flag, isFlipped, handleFlip } = useCardFlipAnimation();

  // 뒷면
  if (isFlipped) {
    return (
      <div
        className={[
          flag ? "animate-card-flip" : "animate-card-flip2",
          "border-gray3 hover:border-main hover:bg-lightgreen aspect-3/4 w-full flex-col overflow-y-hidden rounded-2xl border px-9 py-9 max-[744px]:aspect-auto max-[744px]:h-[29rem]",
        ].join(" ")}
        onClick={() => {
          if (flag) {
            handleFlip();
          }
        }}
      >
        <div className="flex flex-row items-center gap-1">
          <TiLocation className="text-main" size="1.3rem" />
          <p className="text-gray1 text-lg">
            {diary.diaryDayContentResponses.diaryDayContentDetail[0].place}
          </p>
        </div>
        <div className="mt-[8.75rem] flex flex-col max-[972px]:mt-[5.375rem]">
          <div className="relative h-20 w-16">
            <Image
              className="object-contain"
              src={`/icons/mood-icon${FEELING_STATUS[diary.diaryDayContentResponses.diaryDayContentDetail[0].feelingStatus]}.svg`}
              alt="mood-icon"
              fill={true}
            />
          </div>
          <Link
            className="hover:text-main mt-12 w-full truncate text-2xl font-bold max-[845px]:mt-5"
            href={`/diary/${diary.diaryId}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {diary.title}
          </Link>
          <p className="text-gray1 mt-3 text-lg max-[1024px]:mt-2 max-[744px]:mt-1">
            {new Date(
              new Date(diary.startDatetime).getTime() + 1000 * 60 * 60 * 24,
            ).toLocaleDateString("ko-KR")}
          </p>
          <div
            className="truncate-vertical-diary-content mt-6 text-black max-[845px]:mt-3"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                diary.diaryDayContentResponses.diaryDayContentDetail[0].content,
                { allowedTags: ["p"] },
              ),
            }}
          />
        </div>
      </div>
    );
  }

  // 앞면
  return (
    <button
      className={[
        flag ? "animate-card-flip2" : "animate-card-flip",
        "border-gray3 hover:border-main relative aspect-3/4 w-full rounded-2xl border max-[744px]:aspect-auto max-[744px]:h-[29rem] max-[518px]:w-full",
      ].join(" ")}
      onClick={() => {
        if (!flag) {
          handleFlip();
        }
      }}
    >
      <Image
        className="-z-10 rounded-[0.9375rem] object-cover"
        src={
          diary.titleImage !== ""
            ? diary.titleImage
            : `/images/season${new Date(diary.startDatetime).getMonth() + 1}.avif`
        }
        alt="image"
        fill={true}
      />
      <div className="absolute bottom-0 h-[11.5rem] w-full rounded-b-2xl bg-linear-to-b from-black/0 to-black/50" />
      <div className="absolute bottom-9 left-9 flex flex-col items-start gap-1 pr-9 text-white">
        <Link
          className="hover:text-main text-start text-2xl font-bold"
          href={`/diary/${diary.diaryId}`}
          onClick={(e) => e.stopPropagation()}
        >
          {diary.title}
        </Link>
        <p className="text-lg">{`${new Date(new Date(diary.startDatetime).getTime() + 1000 * 60 * 60 * 24).toLocaleDateString("ko-KR")}`}</p>
      </div>
    </button>
  );
};
