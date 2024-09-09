import "@/styles/reactDataRange.css";
import { add, format } from "date-fns";
import ko from "date-fns/locale/ko";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
interface IGatheringFilterModalProps {
  closeModal: () => void;
}

const regions = [
  { id: 0, name: "전체" },
  { id: 1, name: "서울" },
  { id: 2, name: "광주" },
  { id: 3, name: "인천" },
  { id: 4, name: "대전" },
  { id: 5, name: "대구" },
  { id: 6, name: "전남" },
  { id: 7, name: "경북" },
  { id: 8, name: "경남" },
  { id: 9, name: "부산" },
  { id: 10, name: "울산" },
  { id: 11, name: "제주" },
  { id: 12, name: "경기" },
  { id: 13, name: "강원" },
  { id: 14, name: "충북" },
  { id: 15, name: "충남" },
  { id: 16, name: "전북" },
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

const markerPositions = [20, 25, 30, 35, 40, 45, 50, 55, 59];

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
  const [sex, setSex] = useState(searchParams.get("allowedSex") || "ALL");
  const [startAge, setStartAge] = useState(
    searchParams.get("startAge") ? Number(searchParams.get("startAge")) : 20,
  );
  const [endAge, setEndAge] = useState(
    searchParams.get("endAge") ? Number(searchParams.get("endAge")) : 59,
  );
  const [isFilterSchedule, setIsFilterSchedule] = useState((searchParams.get("startDate") || searchParams.get("endDate")) ? true : false);
  const [values, setValues] = useState([startAge, endAge]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
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

  const onClickDecreaseMinAge = () => {
    let temp = Math.max(20, startAge - 1);
    if (temp <= endAge) {
      setStartAge(temp);
      setValues((prev) => [temp, prev[1]]);
    }
  };

  const onClickImproveMinAge = () => {
    let temp = Math.min(endAge, startAge + 1);
    setStartAge(temp);
    setValues((prev) => [temp, prev[1]]);
  };

  const onClickDecreaseMaxAge = () => {
    let temp = Math.max(startAge, endAge - 1);
    setEndAge(temp);
    setValues((prev) => [prev[0], temp]);
  };

  const onClickImproveMaxAge = () => {
    let temp = Math.min(59, endAge + 1);
    if (temp >= startAge) {
      setEndAge(temp);
      setValues((prev) => [prev[0], temp]);
    }
  };

    const handleChange = (newValues: number[] | number) => {
      const valuesArray = newValues as number[];
      setValues(valuesArray);
      setStartAge(valuesArray[0]);
      setEndAge(valuesArray[1]);
  };
  
    const handleMarkerClick = (age: number) => {
      const distanceToStart = Math.abs(startAge - age);
      const distanceToEnd = Math.abs(endAge - age);

      if (distanceToStart < distanceToEnd) {
        // Update startAge if it's closer to the clicked age
        const newStartAge = age;
        setStartAge(newStartAge);
        setValues([newStartAge, endAge]);
      } else {
        // Update endAge if it's closer to the clicked age
        const newEndAge = age;
        setEndAge(newEndAge);
        setValues([startAge, newEndAge]);
      }
    };


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
    setIsFilterSchedule(false);
  };

  const submitApplyFilter = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("location");
    params.delete("startAge");
    params.delete("endAge");
    params.delete("allowedSex");
    params.delete("startDate");
    params.delete("endDate");
    // 지역
    if (location != 0) {
      params.set("location", location+"");
    }
    // 성별
    if (sex != "ALL") {
      params.set("allowedSex", sex + "");
    }
    // 최소나이
    if (startAge != 20 || endAge != 59) {
      params.set("startAge", startAge + "");
      params.set("endAge", endAge + "");
    }
    // 일정 선택
    if (isFilterSchedule) {
      params.set("startDate", format(calendarDate[0].startDate, "yyyy-MM-dd"));
      params.set("endDate", format(calendarDate[0].endDate, "yyyy-MM-dd"));
    }
    params.delete("page");
    url.search = params.toString();
    closeModal();
    setTimeout(() => {
        window.history.pushState({}, "", url.toString());
      }, 100);
  };

  useEffect(() => {
    setLocation(+(searchParams.get('location') || 0));
    setSex(searchParams.get('allowedSex') || "ALL");
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
        "relative h-full max-h-[47.5rem] w-[calc(100vw-1rem)] max-w-[40rem] scrollbar-hide overflow-y-scroll rounded-2xl bg-white p-[3rem]"
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
      <div className="flex w-full flex-col gap-y-[2rem] pt-[3rem]">
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
        <article className="flex w-full flex-col gap-y-[1rem]">
          <div className="font-bold text-black">
            <span className="text-xl"> 나이 </span>
            <div className="flex w-full justify-between pt-[1rem]">
              <div>
                <span> {new Date().getFullYear() - startAge} 년생 </span>
                <span> {`(${startAge} 세)`} </span>
              </div>
              <div>
                <span> {new Date().getFullYear() - endAge} 년생 </span>
                <span> {`(${endAge} 세)`} </span>
              </div>
            </div>
            {/* 화살표 버튼 */}
            <div className="flex h-[3rem] select-none items-center justify-between gap-x-4 pt-[1rem]">
              <div className="flex w-full rounded-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]">
                <button
                  className="flex h-[2rem] w-full flex-col items-center justify-center"
                  onClick={() => onClickDecreaseMinAge()}
                >
                  <Image
                    src={"/calendar-prev-arrow-icon.svg"}
                    alt={"prev-icon"}
                    width={12}
                    height={12}
                  />
                </button>
                <button
                  className="flex h-[2rem] w-full flex-col items-center justify-center"
                  onClick={() => onClickImproveMinAge()}
                >
                  <Image
                    src={"/calendar-next-arrow-icon.svg"}
                    alt={"next-icon"}
                    width={12}
                    height={12}
                  />
                </button>
              </div>
              <div className="flex w-full rounded-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]">
                <button
                  className="flex h-[2rem] w-full flex-col items-center justify-center"
                  onClick={() => onClickDecreaseMaxAge()}
                >
                  <Image
                    src={"/calendar-prev-arrow-icon.svg"}
                    alt={"prev-icon"}
                    width={12}
                    height={12}
                  />
                </button>
                <button
                  className="flex h-[2rem] w-full flex-col items-center justify-center"
                  onClick={() => onClickImproveMaxAge()}
                >
                  <Image
                    src={"/calendar-next-arrow-icon.svg"}
                    alt={"next-icon"}
                    width={12}
                    height={12}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="relative flex w-full flex-col justify-center gap-[1rem] pb-[2rem]">
            <Slider
              range
              min={20}
              max={59}
              value={values}
              onChange={handleChange}
              step={1}
              dotStyle={{ display: "none" }}
              activeDotStyle={{ display: "none" }}
              handleStyle={[
                {
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  borderColor: "#0d6efd00",
                  backgroundColor: "#ffffff00",
                  transform: "translate(-50%, 8px)",
                  opacity: 0,
                },
                {
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  borderColor: "#0d6efd00",
                  backgroundColor: "#ffffff00",
                  transform: "translate(-50%, 8px)",
                  opacity: 0,
                },
              ]}
              trackStyle={[
                {
                  backgroundColor: "#0d6efd",
                  height: 30,
                  left:
                    startAge >= 56
                      ? `calc(${((startAge - 20) / 39) * 100}% - 2rem)`
                      : `calc(${((startAge - 20) / 35) * 87.5}% - ${((((startAge - 20) / 35) * 87.5) / 100) * 2}rem)`,
                  width:
                    startAge >= 56
                      ? endAge >= 56
                        ? `calc(100% - (${((startAge - 20) / 39) * 100}% - 2rem - (${((59 - endAge) / 39) * 87.5}%))`
                        : `calc(100% - (${((startAge - 20) / 39) * 100}% - 2rem - (${((59 - endAge) / 39) * 87.5}%))` // 55 1 , 57 0.5,  59 0
                      : endAge >= 55
                        ? `calc(100% - (${((startAge - 20) / 35) * 87.5}% - ${((((startAge - 20) / 35) * 87.5) / 100) * 2}rem) - calc(calc(100% - 2rem) / 8 * ${59 - endAge} / 4 )`
                        : `calc(100% - (${((startAge - 20) / 35) * 87.5}% - ${((((startAge - 20) / 35) * 87.5) / 100) * 2}rem) - calc(calc(100% - 2rem) / 8 * ${55 - endAge + 5} / 5 )`,
                },
              ]}
              railStyle={{
                backgroundColor: "#ddd",
                height: 32,
              }}
            />
            <div className="absolute left-0 right-0 top-[4.5rem] flex w-full justify-between">
              {markerPositions.map((age, index) => (
                <button
                  key={age}
                  onClick={() => handleMarkerClick(age)}
                  className={
                    "top-[-1.5rem] flex aspect-square w-[2rem] cursor-pointer select-none items-center justify-center rounded-full bg-gray2 text-center text-white transition-transform duration-200 hover:bg-main" +
                    ` ${age >= startAge && age <= endAge && "bg-main"}`
                  }
                  style={{
                    position: "relative",
                  }}
                >
                  <div className="text-md absolute font-medium">{age}</div>
                </button>
              ))}
            </div>
          </div>
        </article>
        <div className={"flex flex-col items-center gap-[.5rem] pt-[2rem]"}>
          <div
            className={
              "flex h-[2rem] w-full items-center justify-between gap-4 font-bold text-black"
            }
          >
            <span> 일정 </span>
            <button
              className={"flex gap-1 text-sm font-medium text-black"}
              onClick={() => setIsFilterSchedule((prev) => !prev)}
            >
              {isFilterSchedule ? (
                <Image
                  src="/common/check-active-icon.svg"
                  alt="location-icon"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/common/check-empty-icon.svg"
                  alt="location-icon"
                  width={20}
                  height={20}
                />
              )}
              특정 기간 선택하기
            </button>
          </div>

          {isFilterSchedule && (
            <div>
              <div className={"flex gap-1 py-[1rem]"}>
                {SELECTED_SCHEDULE_DATA.map((i) => (
                  <button
                    key={i.name}
                    className={
                      "rounded-lg bg-main px-[.5rem] py-[.125rem] text-white"
                    }
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
                  color={"#ff0000"}
                  onShownDateChange={(e) => {
                    setMonth(e.getMonth() + 1);
                    setYear(e.getFullYear());
                  }}
                />
                <div
                  className={
                    "absolute left-[50%] top-6 translate-x-[-50%] font-semibold"
                  }
                >
                  {year}.{month}
                </div>
              </div>
              <div
                className={"flex h-[1.5rem] w-full justify-center gap-[.25rem]"}
              >
                <div>{format(calendarDate[0].startDate, "yyyy-MM-dd")}</div>
                <div>~</div>
                <div>{format(calendarDate[0].endDate, "yyyy-MM-dd")}</div>
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
          설정 초기화
        </button>
      </div>
    </div>
  );
};
export default GatheringFilterModal;
