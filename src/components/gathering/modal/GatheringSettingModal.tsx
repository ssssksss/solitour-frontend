import {
  SETTING_MODAL_AGE,
  SETTING_MODAL_SEX,
} from "@/constants/gathering/GatheringConstant";
import "@/styles/reactDataRange.css";
import { add, format, isBefore, parse } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Calendar } from "react-date-range";
import { useFormContext } from "react-hook-form";
interface IGatheringSettingModalProps {
  closeModal: () => void;
}

const GatheringSettingModal = (props: IGatheringSettingModalProps) => {
  const formContext = useFormContext();
  const [peopleCount, setPeopleCount] = useState(formContext.getValues("personCount") || 6);
  const [sex, setSex] = useState(formContext.getValues("allowedSex") || "ALL");
  const [startAge, setStartAge] = useState(formContext.getValues("startAge") ? new Date().getFullYear() - formContext.getValues("startAge") : 20);
  const [endAge, setEndAge] = useState(formContext.getValues("endAge") ? new Date().getFullYear() - formContext.getValues("endAge") : 59);
  const [deadlineDate, setDeadlineDate] = useState<Date>(formContext.getValues("deadline") ? new Date(formContext.getValues("deadline")) : new Date());
  const [deadlineHour, setDeadlineHour] = useState<number>(formContext.getValues("deadline") ? +format(formContext.getValues("deadline"), "HH") : new Date().getHours());
  const [deadlineMinute, setDeadlineMinute] = useState<number>(formContext.getValues("deadline") ? +format(formContext.getValues("deadline"), "mm") : -1);
  const isToday = deadlineDate?.toDateString() === new Date().toDateString();
  const [deadlineError, setDeadlineError] = useState<boolean>(false);
  const handleDateSelect = (date: Date) => {
    setDeadlineDate(date);
    setDeadlineError(false);

    // 오늘 날짜이고
    if (date.toDateString() === new Date().toDateString()) {
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();
      if (deadlineHour < currentHour) {
        // 현재시간보다 마감일 시간이 작다면 현재시간으로 변경
        setDeadlineHour(currentHour);
      } else if (deadlineHour === currentHour && deadlineMinute < currentMinute) {
        // 현재시간보다 마감일 시간이 같은 경우에 minute가 현재 minute보다 작은지 판단, 50분보다 크게 되버리면 분을 선택 못하게 막아버림
        setDeadlineMinute(currentMinute > 50 ? -1 : Math.ceil(currentMinute / 10) * 10);
      }
    }
  };

  const submitHandler = () => {
    const deadline =
    format(deadlineDate, "yyyy-MM-dd") +
    " " +
    deadlineHour.toString().padStart(2,"0") +
    ":" +
      deadlineMinute.toString().padStart(2,"0");
    if (new Date(deadline) < new Date()) {
    setDeadlineError(true);
    return;
  }
    formContext.setValue("deadline", deadline);
    formContext.setValue("startAge", new Date().getFullYear() - startAge);
    formContext.setValue("endAge", new Date().getFullYear() - endAge);
    formContext.setValue("personCount", peopleCount);
    formContext.setValue("allowedSex", sex);
    formContext.watch();
    formContext.trigger();
    props.closeModal();
  };

  useEffect(() => {
    if(deadlineMinute == 0) {
        const _minutes = Array.from([...Array(6).fill(0)], (_, i) => i * 10).filter(j => {
        if (!isToday) {
        return true
      } else if (deadlineHour == new Date().getHours()) {
        return j > new Date().getMinutes() ? true : false
      } else {
        return true
      }
    });
      setDeadlineMinute(_minutes.length > 0 ?  _minutes[0] : 0); 
  }
  },[])


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
        <article className={"flex flex-col gap-y-[1rem] relative"}>
          <div className={"h-[2rem] font-bold text-black"}>모집 마감일 </div>
          <div>
            <Calendar
              date={deadlineDate}
              onChange={handleDateSelect}
              minDate={new Date()}
              maxDate={add(new Date(), { years: 1 })}
              locale={ko}
              color={"#00B488"}
            />
          </div>
          <div className={"flex w-full gap-[.5rem]"}>
            <div className={"flex items-center"}> 마감일 : </div>
            <div
              className={
                "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
            >
              {deadlineDate && format(deadlineDate as Date, "yyyy-MM-dd")}
            </div>
            <select
              name="hour"
              className={
                "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
              onChange={(e) => {
                setDeadlineHour(+e.target.value);
                setDeadlineError(false);
                setDeadlineMinute(-1);
              }}
              value={deadlineHour}
            >
              {Array.from([...Array(24).fill(0)], (_, i) => i).filter(j=>!(isToday && j < new Date().getHours())).map((k) => (
                <option
                  value={k}
                  key={k}
                >
                  {k}
                </option>
              ))}
            </select>
            <div className={"flex items-center"}> 시 </div>
            <select
              name="minute"
              className={
                "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
              onChange={(e) =>
                {
                setDeadlineMinute(+e.target.value);
                setDeadlineError(false);
                }
              }
              value={deadlineMinute}
            >
              <option
                value={-1}
                disabled={true}
                selected={true}
                >
                  선택
                </option>
              {Array.from([...Array(6).fill(0)], (_, i) => i * 10).filter(j => {
                if (!isToday) {
                  return true
                } else if(deadlineHour == new Date().getHours()){
                  return j > new Date().getMinutes() ? true : false
                } else {
                  return true
                }
              }).map((k) => (
                <option
                  value={k}
                  key={k}
                >
                  {k}
                </option>
              ))}
            </select>
            <div className={"flex items-center"}> 분 </div>
          </div>
          {deadlineError && (
            <div className="absolute text-red-500"> 마감일은 현재 시간보다 이후여야 합니다. </div>
          )}
        </article>
        <article className={"flex max-w-[16.25rem] justify-between gap-y-[1rem]"}>
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
              {peopleCount > 2 ? (
                <Image
                  src={"/minus-icon.svg"}
                  alt={"minus-icon"}
                  width={20}
                  height={20}
                />
              ): <div className="w-[1.25rem] aspect-square">  </div>}
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
              {peopleCount < 10 ? (
                <Image
                  src={"/plus-icon.svg"}
                  alt={"plus-icon"}
                  width={20}
                  height={20}
                />
              ) : <div className="w-[1.25rem] aspect-square">  </div>}
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
          <div className={"h-[2rem] font-bold text-black"}> 성별 제한 </div>
          <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
            {Object.entries(SETTING_MODAL_SEX).map((i) => (
              <button
                key={i[0]}
                onClick={() => setSex(i[0])}
                className={`${
                  sex == i[0] ? "bg-main text-white" : "text-gray1"
                } flex h-[2rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]`}
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
            `h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1 ${deadlineError && "bg-[#ff0000]"}`
          }
        disabled={isBefore(parse(`${format(deadlineDate as Date, "yyyy-MM-dd")+" "+deadlineHour.toString().padStart(2,"0")+":"+deadlineMinute.toString().padStart(2,"0")}`, 'yyyy-MM-dd HH:mm', new Date()),new Date()) || deadlineMinute < 0}
          onClick={() => submitHandler()}
          >
          적용하기
        </button>
      </div>
    </div>
  );
};
export default GatheringSettingModal;
