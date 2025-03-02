import { Modal } from "@/components/common/modal/Modal";
import ModalTemplate from "@/components/common/modal/ModalTemplate";
import { SETTING_MODAL_AGE } from "@/constants/gathering/GatheringConstant";
import useModalState from "@/hooks/useModalState";
import "@/styles/reactDataRange.css";
import { add, format } from "date-fns";
import ko from "date-fns/locale/ko";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { MdClose } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";

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

const GatheringFilterModal = () => {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || 0);
  const [sex, setSex] = useState(searchParams.get("allowedSex") || "ALL");
  const [startAge, setStartAge] = useState<number | undefined>(
    searchParams.get("startAge") ? Number(searchParams.get("startAge")) : 20,
  );
  const [endAge, setEndAge] = useState<number | undefined>(
    searchParams.get("endAge") ? Number(searchParams.get("endAge")) : 59,
  );
  const [isFilterSchedule, setIsFilterSchedule] = useState(
    searchParams.get("startDate") || searchParams.get("endDate") ? true : false,
  );
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
  const [directInput, setDirectInput] = useState(false);
  const ageHandler = ({
    _startAge,
    _endAge,
  }: {
    _startAge: number;
    _endAge: number;
  }) => {
    setDirectInput(false);
    if ((endAge || 0) + 1 == _startAge) {
      setEndAge(_endAge);
    } else if ((startAge || 0) - 1 == _endAge) {
      setStartAge(_startAge);
    } else {
      setStartAge(_startAge);
      setEndAge(_endAge);
    }
  };
  const modalState = useModalState();
  const [loading, setLoading] = useState(true);

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
      params.set("location", location + "");
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
    modalState.closeModal();
    setTimeout(() => {
      window.history.pushState({}, "", url.toString());
    }, 100);
  };

  useEffect(() => {
    setLocation(+(searchParams.get("location") || 0));
    setSex(searchParams.get("allowedSex") || "ALL");
    setStartAge(+(searchParams.get("startAge") || 20));
    setEndAge(+(searchParams.get("endAge") || 59));
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
  }, [searchParams]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="relative flex h-[2rem] w-[3.5rem] flex-shrink-0 animate-pulse items-center rounded-xl bg-gray-300 text-left"></div>
    );
  }

  return (
    <div>
      <button
        className="flex flex-row items-center hover:text-main"
        onClick={() => modalState.openModal()}
      >
        <VscSettings size="1.25rem" />
        <div>필터</div>
      </button>
      <Modal modalState={modalState}>
        <ModalTemplate className="max-h-[47.5rem] w-[calc(100vw-1rem)] max-w-[40rem]">
          <button
            onClick={() => modalState.closeModal()}
            className="absolute right-[2rem] top-[2rem] h-[2rem] w-[2rem] scale-100 transform transition-transform duration-300"
            style={{ zIndex: 200 }}
          >
            <MdClose
              className="bg-red-60 cursor-pointer text-gray2 hover:text-main"
              size={"2.5rem"}
              onClick={() => {
                modalState.closeModal();
              }}
            />
          </button>
          <h2 className="h-[2rem] text-2xl font-bold text-black">조건 선택</h2>
          <div className="flex w-full flex-col gap-y-[2rem] pt-[3rem]">
            <div className="flex flex-col gap-y-[1rem]">
              <div className="h-[2rem] font-bold text-black">지역</div>
              <div className="flex flex-wrap gap-x-[1rem] gap-y-[.5rem]">
                {regions.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => setLocation(i.id)}
                    className={`${location == i.id ? "bg-main text-white outline-0" : "text-gray1 outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]"} flex items-center rounded-[4rem] px-4 py-2`}
                  >
                    {i.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-y-[1rem]">
              <div className="h-[2rem] font-bold text-black">성별</div>
              <div className="flex flex-wrap gap-x-[1rem] gap-y-[.5rem]">
                {SEX.map((i) => (
                  <button
                    key={i[1]}
                    onClick={() => setSex(i[1])}
                    className={`${sex == i[1] ? "bg-main text-white" : "text-gray1 outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]"} flex items-center rounded-[4rem] px-4 py-2`}
                  >
                    {i[0]}
                  </button>
                ))}
              </div>
            </div>
            <article className="flex w-full flex-col gap-y-[1rem]">
              <div className="h-[2rem] text-start font-bold text-black">
                나이
              </div>
              <div className="relative flex w-full flex-col gap-[1rem]">
                <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
                  {Object.entries(SETTING_MODAL_AGE).map((i) => (
                    <button
                      key={i[0]}
                      onClick={() =>
                        ageHandler({
                          _startAge: i[1].startAge,
                          _endAge: i[1].endAge,
                        })
                      }
                      className={`${directInput == false && (startAge || 0) <= i[1].startAge && (endAge || 0) >= i[1].endAge ? "bg-main text-white outline-0" : "outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]"} flex flex-shrink-0 items-center rounded-[4rem] px-4 py-2 text-gray1 hover:bg-main hover:text-white`}
                    >
                      {i[0]}
                    </button>
                  ))}
                  <button
                    className={`${directInput ? "bg-main text-white outline-0" : "outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]"} rounded-[4rem] px-4 py-2 text-gray1 hover:bg-main hover:text-white`}
                    onClick={() => setDirectInput(true)}
                  >
                    직접 입력
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-x-[1rem] gap-y-[.5rem]">
                  <div className="relative flex w-[5.125rem] py-[.5rem] pr-[0.625rem] after:content-['세']">
                    <input
                      placeholder="최소 20"
                      type={"text"}
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
                        setStartAge(num || undefined);
                      }}
                      value={startAge || undefined}
                      className="w-full text-center text-lg"
                    />
                    <div className="absolute bottom-2 h-[1px] w-[5.125rem] bg-black" />
                    <div className="absolute bottom-[-1.5rem] left-[50%] flex w-full translate-x-[-50%] justify-center font-semibold text-main">
                      {new Date().getFullYear() - (startAge || 0)} 년생
                    </div>
                  </div>
                  <div>~</div>
                  <div className="relative flex w-[5.125rem] py-[.5rem] pr-[0.625rem] after:content-['세']">
                    <input
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
                        setEndAge(num || undefined);
                      }}
                      onInput={(e: React.FormEvent<HTMLInputElement>) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[^0-9]/g, "");
                      }}
                      value={endAge}
                      className="w-full pr-[0.625rem] text-center text-lg"
                    />
                    <div className="absolute bottom-2 h-[1px] w-[5.125rem] bg-black" />
                    <div className="absolute bottom-[-1.5rem] left-[50%] flex w-full translate-x-[-50%] justify-center font-semibold text-main">
                      {new Date().getFullYear() - (endAge || 0)} 년생
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <div className="flex flex-col items-center gap-[.5rem] pt-[2rem]">
              <div className="flex h-[2rem] w-full items-center justify-between gap-4 font-bold text-black">
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
                  <div className="flex gap-1 py-[1rem]">
                    {SELECTED_SCHEDULE_DATA.map((i) => (
                      <button
                        key={i.name}
                        className="rounded-lg bg-main px-[.5rem] py-[.125rem] text-white"
                        onClick={() => {
                          setCalendarDate([
                            {
                              startDate: calendarDate[0].startDate,
                              endDate: new Date(
                                new Date(calendarDate[0].startDate).setDate(
                                  new Date(
                                    calendarDate[0].startDate,
                                  ).getDate() +
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
                    <div className="absolute left-[50%] top-6 translate-x-[-50%] font-semibold">
                      {year}.{month}
                    </div>
                  </div>
                  <div className="flex h-[1.5rem] w-full justify-center gap-[.25rem]">
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
          <div className="flex w-full justify-center gap-[1rem] pt-[2rem]">
            <button
              onClick={() => initFilterOptionHandler()}
              className="h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white"
            >
              설정 초기화
            </button>
            <button
              onClick={() => submitApplyFilter()}
              className="h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white"
            >
              적용하기
            </button>
          </div>
        </ModalTemplate>
      </Modal>
    </div>
  );
};

export default GatheringFilterModal;
