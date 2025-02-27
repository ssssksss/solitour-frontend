import { FEELING_STATUS } from "@/constants/diary/feelingStatus";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { motion } from "motion/react";
import { TiLocation } from "react-icons/ti";

interface Props {
  diaryData: {
    diaryId: number;
    title: string;
    titleImage: string;
    startDatetime: Date;
    endDatetime: Date;
    diaryDayContentResponses: {
      diaryDayContentDetail: {
        content: string;
        feelingStatus: string;
        place: string;
      }[];
    };
  };
  flag: boolean;
  isFlipped: boolean;
  flip: () => void;
}

const DiaryCard = ({ diaryData, flag, isFlipped, flip }: Props) => {
  // 뒷면
  if (isFlipped) {
    return (
      <div
        className={`${flag ? "animate-cardFlip" : "animate-cardFlip2"} aspect-[3/4] w-full flex-col overflow-y-hidden rounded-2xl border-[0.0625rem] border-gray3 px-9 py-9 hover:border-main hover:bg-lightGreen max-[744px]:aspect-auto max-[744px]:h-[29rem]`}
        onClick={() => {
          if (flag) {
            flip();
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
          <p className="text-lg text-gray1">
            {diaryData.diaryDayContentResponses.diaryDayContentDetail[0].place}
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
              src={`/icons/mood-icon${FEELING_STATUS[diaryData.diaryDayContentResponses.diaryDayContentDetail[0].feelingStatus]}.svg`}
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
              className="w-full text-2xl font-bold hover:text-main"
              href={`/diary/${diaryData.diaryId}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {diaryData.title}
            </Link>
          </motion.div>
          <motion.p
            className="mt-3 text-lg text-gray1 max-[1024px]:mt-2 max-[744px]:mt-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {new Date(
              new Date(diaryData.startDatetime).getTime() + 1000 * 60 * 60 * 24,
            ).toLocaleDateString("ko-KR")}
          </motion.p>
          <motion.div
            className="truncate-vertical-diary-content mt-6 text-black max-[845px]:mt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                diaryData.diaryDayContentResponses.diaryDayContentDetail[0]
                  .content,
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
      className={`${flag ? "animate-cardFlip2" : "animate-cardFlip"} relative aspect-[3/4] w-full rounded-2xl border-[0.0625rem] border-gray3 hover:border-main max-[744px]:aspect-auto max-[744px]:h-[29rem] max-[518px]:w-full`}
      onClick={() => {
        if (!flag) {
          flip();
        }
      }}
      initial={{ rotateY: -90 }}
      whileInView={{ rotateY: 0 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      <Image
        className="-z-10 rounded-[0.9375rem]"
        src={
          diaryData.titleImage !== ""
            ? diaryData.titleImage
            : `/diary/season${new Date(diaryData.startDatetime).getMonth() + 1}.avif`
        }
        alt="season-image"
        fill={true}
        style={{ objectFit: "cover" }}
      />
      <div className="absolute bottom-0 h-[11.5rem] w-full rounded-b-2xl bg-gradient-to-b from-black/0 to-black/50" />
      <motion.div
        className="absolute bottom-9 left-9 flex flex-col items-start gap-1 pr-9 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          className="text-start text-2xl font-bold hover:text-main"
          href={`/diary/${diaryData.diaryId}`}
          onClick={(e) => e.stopPropagation()}
        >
          {diaryData.title}
        </Link>
        <p className="text-lg">{`${new Date(new Date(diaryData.startDatetime).getTime() + 1000 * 60 * 60 * 24).toLocaleDateString("ko-KR")}`}</p>
      </motion.div>
    </motion.button>
  );
};

export default DiaryCard;
