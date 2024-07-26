import {
  SETTING_MODAL_AGE,
  SETTING_MODAL_SEX,
} from "@/constants/gathering/GatheringConstant";
import "@/styles/reactDataRange.css";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
interface IGatheringSettingModalProps {
  closeModal: () => void;
}

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

const GatheringSettingModal = (props: IGatheringSettingModalProps) => {
  const [peopleCount, setPeopleCount] = useState(10);
  const [sex, setSex] = useState("all");
  const [startAge, setStartAge] = useState(20);
  const [endAge, setEndAge] = useState(59);
  const [expirationDate, setExpirationDate] = useState<String>("");
  const [expirationHour, setExpirationHour] = useState<String>("23");
  const [expirationMinute, setExpirationMinute] = useState<String>("0");
  const formContext = useFormContext();

  const submitHandler = () => {
    const expiration =
      expirationDate +
      " " +
      expirationHour.padStart(2, "0") +
      ":" +
      expirationMinute.padStart(2, "0");
    formContext.setValue("expirationDate", expiration);
    formContext.setValue(
      "permitMinUserAgeYear",
      new Date().getFullYear() - startAge,
    );
    formContext.setValue(
      "permitMaxUserAgeYear",
      new Date().getFullYear() - endAge,
    );
    formContext.watch();
    props.closeModal();
  };

  return (
    <div
      className={
        "relative h-full max-h-[44.5rem] w-[calc(100vw-1rem)] max-w-[40rem] overflow-scroll rounded-2xl bg-white px-[1rem] py-[2.875rem] md:p-[2.875rem]"
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
      <h2 className={"h-[2rem] text-2xl font-bold text-black"}> 모임 설정 </h2>
      <section className="flex w-full flex-col gap-y-[2rem] pt-[3rem]">
        <article className={"flex flex-col gap-y-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}>모집 마감일 </div>
          <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
            <input
              type={"date"}
              className={
                "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
              onChange={(e) => setExpirationDate(e.target.value)}
            />
            <select
              name="hour"
              className={
                "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
              onChange={(e) => setExpirationHour(e.target.value)}
            >
              {Array.from([...Array(24).fill(0)], (i, index) => index).map(
                (i) => (
                  <option value={23 - i} selected={i == 0} key={i}>
                    {23 - i}
                  </option>
                ),
              )}
            </select>
            <div className={"flex items-center"}> 시 </div>
            <select
              name="minute"
              className={
                "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
              onChange={(e) => setExpirationMinute(e.target.value)}
            >
              {Array.from([...Array(6).fill(0)], (i, index) => index * 10).map(
                (i) => (
                  <option value={i} selected={i == 0} key={i}>
                    {i}
                  </option>
                ),
              )}
            </select>
            <div className={"flex items-center"}> 분 </div>
          </div>
        </article>
        <article
          className={"flex max-w-[16.25rem] justify-between gap-y-[1rem]"}
        >
          <div className={"h-[2rem] font-bold text-black"}> 인원 </div>
          <div
            className={"flex flex-wrap items-center gap-x-[1rem] gap-y-[.5rem]"}
          >
            <div
              className="flex h-[2rem] items-center"
              onClick={() => {
                setPeopleCount(peopleCount <= 2 ? 2 : peopleCount - 1);
              }}
            >
              <Image
                src={"/minus-icon.svg"}
                alt={"minus-icon"}
                width={20}
                height={20}
              />
            </div>
            <div className="flex h-[2rem] w-[2.5rem] items-center justify-center">
              <div className={"w-[1rem]"}> {peopleCount} </div> 명
            </div>
            <div
              className="flex h-[2rem] items-center"
              onClick={() => {
                setPeopleCount(peopleCount >= 10 ? 10 : peopleCount + 1);
              }}
            >
              <Image
                src={"/plus-icon.svg"}
                alt={"plus-icon"}
                width={20}
                height={20}
              />
            </div>
          </div>
        </article>
        <article className={"flex w-full flex-col gap-y-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}> 나이 </div>
          <div className="relative flex w-full flex-col gap-[1rem]">
            <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
              {Object.entries(SETTING_MODAL_AGE).map((i) => (
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
              <div
                className={
                  "relative w-[6rem] rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED] sm:w-[8rem]"
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
                  className="w-full"
                />
                <div
                  className={
                    "absolute bottom-[-1.5rem] left-[50%] flex w-full translate-x-[-50%] justify-center font-semibold text-main"
                  }
                >
                  {new Date().getFullYear() - startAge} 년생
                </div>
              </div>
              <div> ~ </div>
              <div
                className={
                  "relative w-[6rem] rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED] sm:w-[8rem]"
                }
              >
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
                  className="w-full"
                />
                <div
                  className={
                    "absolute bottom-[-1.5rem] left-[50%] flex w-full translate-x-[-50%] justify-center font-semibold text-main"
                  }
                >
                  {new Date().getFullYear() - endAge} 년생
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className={"flex flex-col gap-y-[1rem] pt-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}> 성별 </div>
          <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
            {Object.entries(SETTING_MODAL_SEX).map((i) => (
              <button
                key={i[0]}
                onClick={() => setSex(i[0])}
                className={`${sex == i[0] ? "bg-main text-white" : "text-gray1"} flex h-[2rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]`}
              >
                {i[1]}
              </button>
            ))}
          </div>
        </article>
      </section>
      <div className={"flex w-full justify-center gap-[1rem] pt-[2rem]"}>
        <button
          className={
            "h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1"
          }
          disabled={expirationDate == "" && true}
          onClick={() => submitHandler()}
        >
          적용하기
        </button>
      </div>
    </div>
  );
};
export default GatheringSettingModal;
