"use client";

import Image from "next/image";
import Link from "next/link";
import { TiLocation } from "react-icons/ti";
import sanitizeHtml from "sanitize-html";
import { motion } from "motion/react";
import { DeleteIcon, EditIcon } from "@/shared/ui/icon";
import { DeleteModal } from "@/shared/ui/modal";
import { SANITIZE_OPTION } from "@/shared/config";
import { DiaryInfo, FEELING_STATUS } from "@/entities/diary";
import { use } from "react";
import { useDiaryViewer } from "../model/useDiaryViewer";

interface DiaryViewerProps {
  diaryInfoPromise: Promise<DiaryInfo>;
}

export const DiaryViewer = ({
  diaryInfoPromise: diaryPromise,
}: DiaryViewerProps) => {
  const diary = use(diaryPromise).diaryContentResponse;
  const { modalVisible, loading, openModal, closeModal, handleDeleteClick } =
    useDiaryViewer(diary.diaryId);

  return (
    <div className="flex w-full flex-col items-start">
      {modalVisible && (
        <DeleteModal
          loading={loading}
          onDeleteClick={handleDeleteClick}
          onCancelClick={closeModal}
        />
      )}
      <motion.div
        className="relative mt-[5.5rem] h-20 w-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Image
          src={`/icons/mood-icon${FEELING_STATUS[diary.diaryDayContentResponses.diaryDayContentDetail[0].feelingStatus]}.svg`}
          alt="mood-icon"
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </motion.div>
      <motion.h1
        className="mt-12 text-[1.75rem] font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {diary.title}
      </motion.h1>
      <div className="text-gray1 mt-6 flex w-full flex-row flex-wrap items-center justify-between gap-x-12 gap-y-4 text-lg">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {new Date(
            new Date(diary.startDatetime).getTime() + (1000 * 60 * 60 * 24 - 1),
          ).toLocaleDateString("ko-KR")}
        </motion.p>
        <motion.div
          className="flex flex-row items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <TiLocation className="text-main" size={"1.3rem"} />
          <p>{diary.diaryDayContentResponses.diaryDayContentDetail[0].place}</p>
        </motion.div>
      </div>
      <div
        className="diaryViewerContent mt-16"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(
            diary.diaryDayContentResponses.diaryDayContentDetail[0].content,
            SANITIZE_OPTION,
          ),
        }}
      />
      <div className="mt-6 mb-32 flex w-full flex-row items-center justify-end gap-3 text-sm">
        <Link
          className="stroke-gray2 text-gray1 hover:stroke-main hover:text-main flex flex-row items-center gap-1 text-sm"
          href={`/diary/edit/${diary.diaryId}`}
        >
          <EditIcon />
          수정
        </Link>
        <button
          className="fill-gray2 stroke-gray2 text-gray1 hover:fill-main hover:stroke-main hover:text-main flex flex-row items-center gap-1 text-sm"
          onClick={() => openModal()}
        >
          <DeleteIcon className="fill-inherit" />
          삭제
        </button>
      </div>
    </div>
  );
};
