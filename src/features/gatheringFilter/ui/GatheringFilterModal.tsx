"use client";

import { AGE_RANGE } from "@/entities/user";
import { ModalTemplate } from "@/shared/ui/modal";
import { add, format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import "rc-slider/assets/index.css";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useGatheringFilterModal } from "../model/useGatheringFilterModal";

const regions = [
  { id: 0, name: "전체" },
  { id: 13, name: "강원" },
  { id: 12, name: "경기" },
  { id: 8, name: "경남" },
  { id: 7, name: "경북" },
  { id: 2, name: "광주" },
  { id: 5, name: "대구" },
  { id: 4, name: "대전" },
  { id: 9, name: "부산" },
  { id: 1, name: "서울" },
  { id: 245, name: "세종" },
  { id: 10, name: "울산" },
  { id: 3, name: "인천" },
  { id: 6, name: "전남" },
  { id: 16, name: "전북" },
  { id: 11, name: "제주" },
  { id: 15, name: "충남" },
  { id: 14, name: "충북" },
];

const SELECTED_SCHEDULE_DATA = [
  {
    name: "7일",
    value: 7,
  },
  {
    name: "14일",
    value: 14,
  },
  {
    name: "21일",
    value: 21,
  },
  {
    name: "30일",
    value: 30,
  },
  {
    name: "60일",
    value: 60,
  },
  {
    name: "90일",
    value: 90,
  },
];

const SEX = [
  ["전체", "ALL"],
  ["남성", "MALE"],
  ["여성", "FEMALE"],
];

function calculateDateDifference(startDate: Date, endDate: Date): number {
  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
}

interface GatheringFilterModalProps {
  closeModal: () => void;
}

export const GatheringFilterModal = ({
  closeModal,
}: GatheringFilterModalProps) => {
  const {
    location,
    sex,
    startAge,
    endAge,
    isFilterSchedule,
    year,
    month,
    calendarDate,
    directInput,
    setLocation,
    setSex,
    setStartAge,
    setEndAge,
    setIsFilterSchedule,
    setYear,
    setMonth,
    setCalendarDate,
    setDirectInput,
    handleAgeChange,
    handleInitButtonClick,
    handleSubmit,
  } = useGatheringFilterModal(closeModal);

  return (
    <ModalTemplate
      className="max-h-190 w-[calc(100vw-1rem)] max-w-160 p-6"
      closeModal={closeModal}
    >
      <h2 className="h-8 text-2xl font-bold text-black">조건 선택</h2>
      <div className="flex w-full flex-col gap-y-8 pt-4">
        <div className="flex flex-col gap-1">
          <div className="h-8 font-bold text-black">지역</div>
          <div className="flex flex-wrap gap-2">
            {regions.map((i) => (
              <button
                key={i.id}
                className={[
                  location === i.id
                    ? "bg-main text-white outline-0"
                    : "text-gray1 outline -outline-offset-1 outline-[#E9EBED]",
                  "flex items-center rounded-[4rem] px-3 py-1.5",
                ].join(" ")}
                onClick={() => setLocation(i.id)}
              >
                {i.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-8 font-bold text-black">성별</div>
          <div className="flex flex-wrap gap-2">
            {SEX.map((i) => (
              <button
                key={i[1]}
                className={[
                  sex == i[1]
                    ? "bg-main text-white"
                    : "text-gray1 outline -outline-offset-1 outline-[#E9EBED]",
                  "flex items-center rounded-[4rem] px-3 py-1.5",
                ].join(" ")}
                onClick={() => setSex(i[1])}
              >
                {i[0]}
              </button>
            ))}
          </div>
        </div>
        <article className="flex w-full flex-col gap-1">
          <div className="h-8 text-start font-bold text-black">나이</div>
          <div className="relative flex w-full flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {Object.entries(AGE_RANGE).map((i) => (
                <button
                  key={i[0]}
                  className={[
                    directInput == false &&
                    (startAge || 0) <= i[1].startAge &&
                    (endAge || 0) >= i[1].endAge
                      ? "bg-main text-white outline-0"
                      : "outline -outline-offset-1 outline-[#E9EBED]",
                    "text-gray1 hover:bg-main flex shrink-0 items-center rounded-[4rem] px-3 py-1.5 hover:text-white",
                  ].join(" ")}
                  onClick={() =>
                    handleAgeChange({
                      _startAge: i[1].startAge,
                      _endAge: i[1].endAge,
                    })
                  }
                >
                  {i[0]}
                </button>
              ))}
              <button
                className={[
                  directInput
                    ? "bg-main text-white outline-0"
                    : "outline -outline-offset-1 outline-[#E9EBED]",
                  "text-gray1 hover:bg-main rounded-[4rem] px-4 py-2 hover:text-white",
                ].join(" ")}
                onClick={() => setDirectInput(true)}
              >
                직접 입력
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="relative flex w-20.5 items-center py-2 pr-2.5 after:content-['세']">
                <input
                  className="w-full text-center text-lg outline-none placeholder:text-sm"
                  placeholder="최소 20"
                  type="text"
                  disabled={!directInput}
                  onChange={(e) => {
                    let num = Number(e.target.value);
                    if (e.target.value.length > 1) {
                      // ? 최대값을 넘었는가?
                      if (num > 59) {
                        num = 59;
                      }
                      // ? endAge값을 넘었는가?
                      if (num > (endAge || 0)) {
                        if ((endAge || 0) < 60) {
                          setEndAge(num);
                        }
                      }
                      // ? 최소 나이값보다 작은가?
                      if (num < 20) num = 20;
                    }
                    setStartAge(num);
                  }}
                  value={startAge || undefined}
                />
                <div className="absolute bottom-2 h-[1px] w-20.5 bg-black" />
                <div className="text-main absolute -bottom-6 left-1/2 flex w-full -translate-x-1/2 justify-center font-semibold">
                  {new Date().getFullYear() - (startAge || 0)} 년생
                </div>
              </div>
              <div>~</div>
              <div className="relative flex w-20.5 items-center py-2 pr-2.5 after:content-['세']">
                <input
                  className="w-full pr-2.5 text-center text-lg outline-none placeholder:text-sm"
                  placeholder="최대 59"
                  type="text"
                  max={59}
                  disabled={!directInput}
                  onChange={(e) => {
                    let num = Number(e.target.value);
                    if (e.target.value.length > 1) {
                      // ? 최소 나이값보다 작은가?
                      if (num < 20) num = 20;
                      // ? startAge값보다 작은가?
                      if (num < (startAge || 0)) {
                        if (startAge || 0 > 19) {
                          setStartAge(num);
                        }
                      }
                      // ? 최대값을 넘었는가?
                      if (num > 59) {
                        num = 59;
                      }
                    }
                    setEndAge(num);
                  }}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^0-9]/g, "");
                  }}
                  value={endAge}
                />
                <div className="absolute bottom-2 h-[1px] w-20.5 bg-black" />
                <div className="text-main absolute -bottom-6 left-1/2 flex w-full -translate-x-1/2 justify-center font-semibold">
                  {new Date().getFullYear() - (endAge || 0)} 년생
                </div>
              </div>
            </div>
          </div>
        </article>
        <div className="flex flex-col items-center gap-2 pt-8">
          <div className="flex h-8 w-full items-center justify-between gap-4 font-bold text-black">
            <span>일정</span>
            <button
              className="flex gap-1 text-sm font-medium text-black"
              onClick={() => setIsFilterSchedule((prev) => !prev)}
            >
              {isFilterSchedule ? (
                <Image
                  src="/icons/check-active-icon.svg"
                  alt="check-active-icon"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/icons/check-empty-icon.svg"
                  alt="check-empty-icon"
                  width={20}
                  height={20}
                />
              )}
              특정 기간 선택하기
            </button>
          </div>
          {isFilterSchedule && (
            <div>
              <div className="flex gap-1 py-4">
                {SELECTED_SCHEDULE_DATA.map((i) => (
                  <button
                    key={i.name}
                    className="bg-main rounded-lg px-2 py-0.5 text-white"
                    onClick={() => {
                      setCalendarDate([
                        {
                          startDate: calendarDate[0].startDate,
                          endDate: new Date(
                            new Date(calendarDate[0].startDate).setDate(
                              new Date(calendarDate[0].startDate).getDate() +
                                i.value -
                                1,
                            ),
                          ),
                          key: "selection",
                        },
                      ]);
                    }}
                  >
                    {i.name}
                  </button>
                ))}
              </div>
              <div className="relative">
                <DateRangePicker
                  onChange={(rangesByKey: RangeKeyDict) => {
                    const selection = rangesByKey.selection;
                    setCalendarDate([
                      {
                        startDate: selection.startDate as Date,
                        endDate: selection.endDate as Date,
                        key: "selection",
                      },
                    ]);
                  }}
                  minDate={new Date()}
                  maxDate={add(new Date(), { years: 1 })}
                  showDateDisplay={false}
                  months={1}
                  ranges={calendarDate}
                  locale={ko}
                  rangeColors={["#00B488", "#F2FAF7"]}
                  color="#ff0000"
                  onShownDateChange={(e) => {
                    setMonth(e.getMonth() + 1);
                    setYear(e.getFullYear());
                  }}
                />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 font-semibold">
                  {year}.{month}
                </div>
              </div>
              <div className="flex h-6 w-full justify-center gap-1">
                <div>{format(calendarDate[0].startDate, "yyyy.MM.dd.")}</div>
                <div>~</div>
                <div>{format(calendarDate[0].endDate, "yyyy.MM.dd.")}</div>
                <div>
                  (
                  {calculateDateDifference(
                    calendarDate[0].startDate,
                    calendarDate[0].endDate,
                  ) + 1}
                  일)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full justify-center gap-4 pt-8">
        <button
          className="bg-main h-12 min-w-32 rounded-[4rem] px-4 py-2 text-white"
          onClick={() => handleInitButtonClick()}
        >
          설정 초기화
        </button>
        <button
          className="bg-main h-12 min-w-32 rounded-[4rem] px-4 py-2 text-white"
          onClick={() => handleSubmit()}
        >
          적용하기
        </button>
      </div>
    </ModalTemplate>
  );
};
