import { FEELING_STATUS } from "@/constants/diary/feelingStatus";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";

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
  days: number;
  currentDay: number;
  flip: () => void;
  setCurrentDay: (day: number) => void;
}

const DiaryCard = ({
  diaryData,
  flag,
  isFlipped,
  days,
  currentDay,
  flip,
  setCurrentDay,
}: Props) => {
  // 뒷면
  if (isFlipped) {
    return (
      <div
        className={`${flag ? "animate-cardFlip" : "animate-cardFlip2"} aspect-[3/4] w-full flex-col overflow-y-hidden rounded-2xl border-[0.0625rem] border-gray3 px-9 py-9 hover:border-main hover:bg-[#F2FAF7] max-[744px]:aspect-auto max-[744px]:h-[29rem] dark:bg-slate-800 dark:hover:bg-slate-600`}
        onClick={() => {
          if (flag) {
            flip();
          }
        }}
      >
        <div className="flex flex-row items-center gap-14">
          <Image
            className="hidden dark:block"
            src="/day-text-dark-mode.svg"
            alt="day-text"
            width={41}
            height={25}
          />
          <Image
            className="dark:hidden"
            src="/day-text.svg"
            alt="day-text"
            width={41}
            height={25}
          />
          <div className="flex flex-row items-center gap-8 truncate">
            {Array.from({ length: days }, (_, index) => index + 1).map(
              (day) => (
                <button
                  key={day}
                  className={`${day === currentDay ? "text-main" : "text-gray2"} font-semibold`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentDay(day);
                  }}
                >
                  {day}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="mt-[8.75rem] flex flex-col max-[972px]:mt-[5.375rem]">
          <div className="relative h-20 w-16">
            <Image
              src={`/mood-icon${FEELING_STATUS[diaryData.diaryDayContentResponses.diaryDayContentDetail[currentDay - 1].feelingStatus]}.svg`}
              alt="mood-icon"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          <Link
            className="mt-12 w-full truncate text-2xl font-bold hover:text-main max-[845px]:mt-5 dark:text-slate-200"
            href={`/diary/${diaryData.diaryId}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {diaryData.title}
          </Link>
          <p className="mt-3 text-lg text-gray1 dark:text-slate-400">
            {new Date(
              new Date(diaryData.startDatetime).getTime() +
                (1000 * 60 * 60 * 24 * currentDay - 1),
            ).toLocaleDateString("ko-KR")}
          </p>
          <p className="truncate-vertical mt-6 text-black max-[845px]:mt-3 dark:text-slate-200">
            {sanitizeHtml(
              diaryData.diaryDayContentResponses.diaryDayContentDetail[
                currentDay - 1
              ].content,
              { allowedTags: [] },
            )}
          </p>
        </div>
      </div>
    );
  }

  // 앞면
  return (
    <button
      className={`${flag ? "animate-cardFlip2" : "animate-cardFlip"} relative aspect-[3/4] w-full rounded-2xl border-[0.0625rem] border-gray3 hover:border-main max-[744px]:aspect-auto max-[744px]:h-[29rem] max-[518px]:w-full`}
      onClick={() => {
        if (!flag) {
          flip();
        }
      }}
    >
      <Image
        className="-z-10 rounded-2xl dark:opacity-65"
        src={diaryData.titleImage}
        alt="diary-image"
        fill={true}
        style={{ objectFit: "cover" }}
      />
      <div className="absolute bottom-9 left-9 flex flex-col items-start gap-1 pr-9 text-white">
        <h2 className="text-start text-2xl font-bold dark:text-slate-200">
          {diaryData.title}
        </h2>
        <p className="text-lg dark:text-slate-200">{`${new Date(diaryData.startDatetime).toLocaleDateString("ko-KR")} ~ ${new Date(diaryData.endDatetime).toLocaleDateString("ko-KR")}`}</p>
      </div>
    </button>
  );
};

export default DiaryCard;
