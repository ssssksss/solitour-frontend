import "@/styles/reactDataRange.css";
import ko from "date-fns/locale/ko";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
;

interface IMeetingFilterModalProps {
    closeModal: () => void;
}

const LOCATION = [
  ["전체","all"],
  ["서울","seoul"],
  ["부산","busan"],
  ["경기","gyeonggi"],
  ["제주","jeju"],
  ["충청","chungcheong"],
  ["강원","gangwon"],
  ["인천","incheon"],
  ["경상","gyeongsang"],
  ["전라","jeolla"],
  ["기타지역","etc"],
];
const SEX = [
  ["전체","all"],
  ["남성","man"],
  ["여성","woman"],
];
const AGE = {
  "전체": {
    startAge: 20,
    endAge: 59,
  },
  "20대": {
    startAge: 20,
    endAge: 29,
  },
  "30대": {
    startAge: 30,
    endAge: 39,
  },
  "40대": {
    startAge: 40,
    endAge: 49,
  },
  "50대": {
    startAge: 50,
    endAge: 59,
  },
}
const CATEGORY = {
  "전체": {
    value: "all",
  },
  "취향": {
    value: "liking",
  },
  "활동": {
    value: "activity",
  },
};

const dateFormat4y2m2d = (date1: string | Date) => {
  const date = new Date(date1);
  const month: number | string = date.getMonth() + 1;
  const day: number | string = date.getDate();

  return (
    date.getFullYear() +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    day.toString().padStart(2, "0")
  );
};

function calculateDateDifference(startDate: Date, endDate: Date): number {
  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
}


const MeetingFilterModal = (props: IMeetingFilterModalProps) => {
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const [location, setLocation] = useState(searchParams.get("location") || "all");
  const [sex, setSex] = useState(searchParams.get("sex") || "all");
  const [startAge, setStartAge] = useState(searchParams.get("startAge") ? Number(searchParams.get("startAge")) : 20);
  const [endAge, setEndAge] = useState(
    searchParams.get("endAge") ? Number(searchParams.get("endAge")) : 59,
  );
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [calendarDate, setCalendarDate] = useState([
    {
      startDate: searchParams.get("startDate")
        ? new Date(searchParams.get("startDate") as string)
        : new Date(),
      endDate: searchParams.get("endDate")
        ? new Date(searchParams.get("endDate") as string)
        : new Date(),
      key: "selection",
    },
  ]);

  const initFilterOptionHandler = () => {
    setLocation(searchParams.get("location") || "all");
    setSex(searchParams.get("sex") || "all");
    setStartAge(searchParams.get("startAge") ? Number(searchParams.get("startAge")) : 20);
    setEndAge(searchParams.get("endAge") ? Number(searchParams.get("endAge")) : 59);
    setCategory(searchParams.get("category") || "all");
    setCalendarDate([
      {
        startDate: searchParams.get("startDate")
          ? new Date(searchParams.get("startDate") as string)
          : new Date(),
        endDate: searchParams.get("endDate")
          ? new Date(searchParams.get("endDate") as string)
          : new Date(),
        key: "selection",
      },
    ]);
  }

  const submitApplyFilter = () => {
    router.replace(
      `/meetings?location=${location}&sex=${sex}&startAge=${startAge}&endAge=${endAge}&category=${category}&startDate=${dateFormat4y2m2d(calendarDate[0].startDate)}&endDate=${dateFormat4y2m2d(calendarDate[0].endDate)}`,
    );
    props.closeModal();
  }

  return (
    <div
      className={
        "relative aspect-square w-[calc(100vw-1rem)] max-w-[40rem] rounded-2xl bg-white px-[1rem] py-[2.875rem] md:p-[2.875rem]"
      }
    >
      <button
        className="absolute right-[1.5rem] top-[1.5rem]"
        onClick={() => props.closeModal()}
      >
        <Image
          src={"/close-icon.svg"}
          alt={"close-icon"}
          width={20}
          height={20}
        />
      </button>
      <h2 className={"h-[2rem] text-2xl font-bold text-black"}> 조건 선택 </h2>
      <article className="flex w-full flex-col gap-y-[2rem] pt-[3rem]">
        <div className={"flex flex-col gap-y-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}> 지역 </div>
          <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
            {LOCATION.map((i) => (
              <button
                key={i[1]}
                onClick={() => setLocation(i[1])}
                className={`${location == i[1] ? "bg-main text-white" : "text-gray1"} flex h-[2rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]`}
              >
                {i[0]}
              </button>
            ))}
          </div>
        </div>
        <div className={"flex flex-col gap-y-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}> 성별 </div>
          <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
            {SEX.map((i) => (
              <button
                key={i[1]}
                onClick={() => setSex(i[1])}
                className={`${sex == i[1] ? "bg-main text-white" : "text-gray1"} flex h-[2rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]`}
              >
                {i[0]}
              </button>
            ))}
          </div>
        </div>
        <div className={"flex w-full flex-col gap-y-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}> 나이 </div>
          <div className="relative flex w-full flex-col gap-[1rem]">
            <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
              {Object.entries(AGE).map((i) => (
                <button
                  key={i[0]}
                  onClick={() => {
                    setStartAge(i[1].startAge);
                    setEndAge(i[1].endAge);
                  }}
                  className={
                    "flex h-[2rem] flex-shrink-0 items-center rounded-[4rem] px-[1rem] py-[.5rem] text-gray1 outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED] hover:bg-main hover:text-white"
                  }
                >
                  {i[0]}
                </button>
              ))}
            </div>
            <div
              className={
                "flex flex-wrap items-center gap-x-[1rem] gap-y-[.5rem] after:content-['세']"
              }
            >
              <input
                type={"number"}
                placeholder="최소 20"
                min={20}
                max={59}
                onChange={(e) => {
                  let num = Number(e.target.value);
                  if (e.target.value.length > 1) {
                    // ? 최대값을 넘었는가?
                    if (num > 59) {
                      num = 59;
                    }
                    // ? endAge값을 넘었는가?
                    if (num > endAge) {
                      if (endAge < 60) {
                        setEndAge(num);
                      }
                    }
                    // ? 최소 나이값보다 작은가?
                    if (num < 20) num = 20;
                  }
                  setStartAge(num);
                }}
                value={startAge}
                className={
                  "w-[8rem] rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]"
                }
              />
              <div> ~ </div>
              <input
                type={"number"}
                placeholder="최대 59"
                min={20}
                max={59}
                onChange={(e) => {
                  let num = Number(e.target.value);
                  if (e.target.value.length > 1) {
                    // ? 최소 나이값보다 작은가?
                    if (num < 20) num = 20;
                    // ? startAge값보다 작은가?
                    if (num < startAge) {
                      if (startAge > 19) {
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
                value={endAge}
                className={
                  "w-[8rem] rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]"
                }
              />
            </div>
          </div>
        </div>
        <div className={"flex flex-col gap-y-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}> 카테고리 </div>
          <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
            {Object.entries(CATEGORY).map((i) => (
              <button
                key={i[1].value}
                className={`${category == i[1].value ? "bg-main text-white" : "text-gray1"} flex h-[2rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] text-gray1 outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]`}
                onClick={() => setCategory(i[1].value)}
              >
                {i[0]}
              </button>
            ))}
          </div>
        </div>
        <div className={"flex flex-col items-center gap-[.5rem]"}>
          <div className={"h-[2rem] w-full font-bold text-black"}> 일정 </div>
          <div>
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
              // moveRangeOnFirstSelection={true}
              showDateDisplay={false}
              months={1}
              ranges={calendarDate}
              locale={ko}
              rangeColors={["#00B488", "#F2FAF7"]}
              color={"#ff0000"}
            />
          </div>
          <div className={"flex h-[1.5rem] w-full justify-center gap-[.25rem]"}>
            <div>{dateFormat4y2m2d(calendarDate[0].startDate)}</div>
            <div>~</div>
            <div>{dateFormat4y2m2d(calendarDate[0].endDate)}</div>
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
      </article>
      <div className={"flex w-full justify-center gap-[1rem] pt-[2rem]"}>
        <button
          onClick={() => submitApplyFilter()}
          className={
            "h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white"
          }
        >
          적용하기
        </button>
        <button
          onClick={() => initFilterOptionHandler()}
          className={
            "h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white"
          }
        >
          초기화
        </button>
      </div>
    </div>
  );
};
export default MeetingFilterModal
