import "@/styles/reactDataRange.css";
import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { add, format } from "date-fns";
import ko from "date-fns/locale/ko";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";

interface IGatheringFilterModalProps {
  closeModal: () => void;
}

const regions = [
  { id: 0, name: "전체" },
  { id: 11, name: "서울" },
  { id: 26, name: "부산" },
  { id: 27, name: "대구" },
  { id: 28, name: "인천" },
  { id: 29, name: "광주" },
  { id: 30, name: "대전" },
  { id: 31, name: "울산" },
  { id: 36, name: "세종" },
  { id: 41, name: "경기" },
  { id: 42, name: "강원" },
  { id: 43, name: "충북" },
  { id: 44, name: "충남" },
  { id: 45, name: "전북" },
  { id: 46, name: "전남" },
  { id: 47, name: "경북" },
  { id: 48, name: "경남" },
  { id: 50, name: "제주" },
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
    value: 30
  },
  {
    name: "60일",
    value: 60
  },
  {
    name: "90일",
    value: 90
  },
]

const SEX = [
  ["전체", "ALL"],
  ["남성", "MALE"],
  ["여성", "FEMALE"],
];
const AGE = {
  전체: {
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
};

function calculateDateDifference(startDate: Date, endDate: Date): number {
  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
}

const GatheringFilterModal = ({closeModal}: IGatheringFilterModalProps) => {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState(
    searchParams.get("location") || 0,
  );
  const [sex, setSex] = useState(searchParams.get("sex") || "ALL");
  const [startAge, setStartAge] = useState(
    searchParams.get("startAge") ? Number(searchParams.get("startAge")) : 20,
  );
  const [endAge, setEndAge] = useState(
    searchParams.get("endAge") ? Number(searchParams.get("endAge")) : 59,
  );
  const [isFilterSchedule, setIsFilterSchedule] = useState((searchParams.get("startDate") || searchParams.get("endDate")) ? true : false);
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
    setLocation(0);
    setSex("ALL");
    setStartAge(20);
    setEndAge(59);
    setCalendarDate([
      {
      startDate: new Date(),
      endDate: new Date(),
        key: "selection",
      },
    ]);
  };

  const submitApplyFilter = () => {
    let _url = `/gathering?`;
    let temp = UrlQueryStringToObject(window.location.href) || {};
    delete temp.location;
    delete temp.startAge;
    delete temp.sex;
    delete temp.endAge;
    delete temp.startDate;
    delete temp.endDate;
    // 지역
    if (location != 0) {
      temp.location = location;
    }
    // 성별
    if (sex != "ALL") {
      temp.sex = sex;
    }
    // 최소나이
    if (startAge != 20) {
      temp.startAge = startAge;
    }
    // 최대나이
    if (endAge != 59) {
      temp.endAge = endAge;
    }
    // 일정 선택
    if (isFilterSchedule) {
      temp.startDate = format(calendarDate[0].startDate, "yyyy-MM-dd"); 
      temp.endDate = format(calendarDate[0].endDate, "yyyy-MM-dd"); 
    }
    if (temp.page) {
      temp.page = 1;
    }
    Object.entries(temp).map(i => {
      _url += i[0]+"="+i[1]+"&"
    })      
    if (_url.endsWith("&")) {
      _url = _url.slice(0, -1);
    }
    window.history.pushState(null, "", _url);
    closeModal();
  };

  useEffect(() => {
    setLocation(+(searchParams.get('location') || 0));
    setSex(searchParams.get('sex') || "ALL");
    setStartAge(+(searchParams.get('startAge') || 20));
    setEndAge(+(searchParams.get('endAge') || 59));
    setCalendarDate([
      {
      startDate: (searchParams.get('startDate') ? new Date(searchParams.get('startDate') as string)  : new Date()),
      endDate: (searchParams.get('endDate') ? new Date(searchParams.get('endDate') as string)  : new Date()),
        key: "selection",
      },
    ]);
    }, [searchParams])

  return (
    <div
      className={
        "relative h-full w-[calc(100vw-1rem)] max-w-[40rem] overflow-scroll rounded-2xl bg-white px-[3rem] py-[2.875rem]"
      }
    >
      <button
        className="absolute right-[1.5rem] top-[1.5rem]"
        onClick={() => closeModal()}
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
            {regions.map((i) => (
              <button
                key={i.id}
                onClick={() => setLocation(i.id)}
                className={`${location == i.id ? "bg-main text-white" : "text-gray1"} flex h-[2rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]`}
              >
                {i.name}
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
        <div className={"flex flex-col items-center gap-[.5rem]"}>
          <div className={"h-[2rem] flex gap-4 w-full font-bold text-black items-center justify-between"}>
            <span> 일정 </span>
            <button className={"flex gap-1 text-sm text-black font-medium"} onClick={() => setIsFilterSchedule(prev => !prev)}>
              {
                isFilterSchedule ?
                <Image src="/common/check-active-icon.svg" alt="location-icon" width={20} height={20} /> :
                <Image src="/common/check-empty-icon.svg" alt="location-icon" width={20} height={20} />
              }
              특정 기간 선택하기
            </button>
          </div>
          
          {
            isFilterSchedule &&
            <div>
                <div className={"flex py-[1rem] gap-1"}>
                  {
                    SELECTED_SCHEDULE_DATA.map(i => (
                      <button
                        key={i.name}
                        className={
                          "rounded-lg bg-main px-[.5rem] py-[.125rem] text-white"
                        }
                        onClick={() => {
                              setCalendarDate([
                              {
                                startDate: calendarDate[0].startDate,
                                endDate: new Date(new Date(calendarDate[0].startDate).setDate(new Date(calendarDate[0].startDate).getDate() + i.value - 1)),
                                key: "selection",
                              },
                            ]);
                        }}
                      >
                        {i.name}
                      </button>
                    ))
                  }
            </div>
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
              color={"#ff0000"}
                />
            <div className={"flex h-[1.5rem] w-full justify-center gap-[.25rem]"}>
            <div>{format(calendarDate[0].startDate, "yyyy-MM-dd")}</div>
            <div>~</div>
            <div>{format(calendarDate[0].startDate, "yyyy-MM-dd")}</div>
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
          }
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
export default GatheringFilterModal;
