"use client";

import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { motion } from "motion/react";
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
        className={`${flag ? "animate-cardFlip" : "animate-cardFlip2"} border-gray3 hover:border-main hover:bg-lightGreen aspect-3/4 w-full flex-col overflow-y-hidden rounded-2xl border px-9 py-9 max-[744px]:aspect-auto max-[744px]:h-[29rem]`}
        onClick={() => {
          if (flag) {
            handleFlip();
          }
        }}
      >
        <motion.div
          className="flex flex-row items-center gap-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <TiLocation className="text-main" size={"1.3rem"} />
          <p className="text-gray1 text-lg">
            {diary.diaryDayContentResponses.diaryDayContentDetail[0].place}
          </p>
        </motion.div>
        <div className="mt-[8.75rem] flex flex-col max-[972px]:mt-[5.375rem]">
          <motion.div
            className="relative h-20 w-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Image
              src={`/icons/mood-icon${FEELING_STATUS[diary.diaryDayContentResponses.diaryDayContentDetail[0].feelingStatus]}.svg`}
              alt="mood-icon"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </motion.div>
          <motion.div
            className="mt-12 w-full truncate max-[845px]:mt-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              className="hover:text-main w-full text-2xl font-bold"
              href={`/diary/${diary.diaryId}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {diary.title}
            </Link>
          </motion.div>
          <motion.p
            className="text-gray1 mt-3 text-lg max-[1024px]:mt-2 max-[744px]:mt-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {new Date(
              new Date(diary.startDatetime).getTime() + 1000 * 60 * 60 * 24,
            ).toLocaleDateString("ko-KR")}
          </motion.p>
          <motion.div
            className="truncate-vertical-diary-content mt-6 text-black max-[845px]:mt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                diary.diaryDayContentResponses.diaryDayContentDetail[0].content,
                { allowedTags: ["p"] },
              ),
            }}
          ></motion.div>
        </div>
      </div>
    );
  }

  // 앞면
  return (
    <motion.button
      className={`${flag ? "animate-cardFlip2" : "animate-cardFlip"} border-gray3 hover:border-main relative aspect-3/4 w-full rounded-2xl border max-[744px]:aspect-auto max-[744px]:h-[29rem] max-[518px]:w-full`}
      onClick={() => {
        if (!flag) {
          handleFlip();
        }
      }}
      initial={{ rotateY: -90 }}
      whileInView={{ rotateY: 0 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      <Image
        className="-z-10 rounded-[0.9375rem]"
        src={
          diary.titleImage !== ""
            ? diary.titleImage
            : `/diary/season${new Date(diary.startDatetime).getMonth() + 1}.avif`
        }
        alt="season-image"
        fill={true}
        style={{ objectFit: "cover" }}
      />
      <div className="absolute bottom-0 h-[11.5rem] w-full rounded-b-2xl bg-linear-to-b from-black/0 to-black/50" />
      <motion.div
        className="absolute bottom-9 left-9 flex flex-col items-start gap-1 pr-9 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          className="hover:text-main text-start text-2xl font-bold"
          href={`/diary/${diary.diaryId}`}
          onClick={(e) => e.stopPropagation()}
        >
          {diary.title}
        </Link>
        <p className="text-lg">{`${new Date(new Date(diary.startDatetime).getTime() + 1000 * 60 * 60 * 24).toLocaleDateString("ko-KR")}`}</p>
      </motion.div>
    </motion.button>
  );
};
