import { DiaryResponseDto } from "@/types/DiaryDto";
import Image from "next/image";
import Link from "next/link";

interface Props {
  diaryData: DiaryResponseDto;
  flag: boolean;
  isFlipped: boolean;
  flip: () => void;
}

const DiaryCard = ({ diaryData, flag, isFlipped, flip }: Props) => {
  if (isFlipped) {
    return (
      <div
        className={`${flag ? "animate-cardFlip" : "animate-cardFlip2"} flex h-[38.9375rem] w-[29.375rem] flex-col rounded-2xl border-[0.0625rem] border-gray3 px-9 py-9 hover:border-main hover:bg-[#F2FAF7] max-[518px]:w-full dark:bg-slate-800 dark:hover:bg-slate-600`}
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
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <p
                key={value}
                className={`${value === 1 ? "text-main" : "text-gray2"} font-semibold`}
              >
                {value}
              </p>
            ))}
          </div>
        </div>
        <div className="relative mt-[8.75rem] h-20 w-16">
          <Image
            src={`/mood-icon${diaryData.moodLevel}.svg`}
            alt="mood-icon"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <Link
          className="mt-12 w-full truncate text-2xl font-bold hover:text-main dark:text-slate-200"
          href="/diary/1"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {diaryData.title}
        </Link>
        <p className="mt-3 text-lg text-gray1 dark:text-slate-400">
          {diaryData.period.split("-")[0]}
        </p>
        <p className="truncate-vertical mt-6 h-[11.5rem] text-black dark:text-slate-200">
          {diaryData.description}
        </p>
      </div>
    );
  }

  return (
    <button
      className={`${flag ? "animate-cardFlip2" : "animate-cardFlip"} relative h-[38.9375rem] w-[29.375rem] rounded-2xl border-[0.0625rem] border-gray3 hover:border-main max-[518px]:w-full`}
      onClick={() => {
        if (!flag) {
          flip();
        }
      }}
    >
      <Image
        className="-z-10 rounded-2xl dark:opacity-65"
        src={diaryData.image}
        alt="diary-image"
        fill={true}
        style={{ objectFit: "cover" }}
      />
      <div className="absolute bottom-9 left-9 flex flex-col items-start gap-1 pr-9 text-white">
        <h2 className="text-start text-2xl font-bold dark:text-slate-200">
          {diaryData.title}
        </h2>
        <p className="text-lg dark:text-slate-200">{diaryData.period}</p>
      </div>
    </button>
  );
};

export default DiaryCard;
