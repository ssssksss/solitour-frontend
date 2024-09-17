import "@/styles/reactDataRange.css";
import {
  add,
  compareAsc,
  format,
  isAfter,
  isBefore,
  isValid,
  subDays,
} from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";
import { Calendar } from "react-date-range";
import { useFormContext } from "react-hook-form";

interface IGatheringDeadlineModalProps {
  closeModal: () => void;
}

const GatheringDeadlineModal = (props: IGatheringDeadlineModalProps) => {
  const formContext = useFormContext();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [deadlineDate, setDeadlineDate] = useState<Date>(
    formContext.getValues("deadline")
      ? new Date(formContext.getValues("deadline"))
      : new Date(),
  );
  const scheduleStartDate = formContext.getValues("scheduleStartDate");
  const handleDateSelect = (date: Date) => {
    setDeadlineDate(date);
  };

  const submitHandler = () => {
    const deadline = format(deadlineDate, "yyyy-MM-dd 23:59");
    formContext.setValue("deadline", deadline);
    formContext.watch();
    formContext.trigger("deadline");
    props.closeModal();
  };

  // maxDate를 결정하는 함수
  const getMaxDate = () => {
    const today = new Date();
    // 현재날짜에서 +1년되는 날짜
    const oneYearFromToday = add(today, { years: 1 });

    if (scheduleStartDate) {
      const scheduleDate = new Date(scheduleStartDate);
      // 날짜가 유효한지 확인
      if (isValid(scheduleDate)) {
        return compareAsc(new Date(scheduleStartDate), oneYearFromToday) < 1
          ? new Date(scheduleStartDate)
          : oneYearFromToday;
      }
    }

    // scheduleStartDate가 없거나 유효하지 않으면 1년 후 날짜를 반환
    return oneYearFromToday;
  };

  return (
    <div
      className={
        "relative h-full max-h-[38rem] w-[calc(100vw-1rem)] max-w-[25rem] overflow-y-scroll rounded-2xl bg-white p-[1rem] scrollbar-hide"
      }
    >
      <button
        className="absolute right-[1rem] top-[1.5rem]"
        onClick={() => props.closeModal()}
      >
        <Image
          src={"/gathering/close-icon.svg"}
          alt={"close-icon"}
          width={20}
          height={20}
        />
      </button>
      <h2 className={"mt-[2rem] h-[2rem] text-2xl font-bold text-black"}>
        모임 마감일 선택
      </h2>
      <section className={"flex flex-col items-center gap-[1.875rem]"}>
        <div className="relative">
          <Calendar
            date={deadlineDate}
            onChange={handleDateSelect}
            minDate={new Date()}
            maxDate={subDays(getMaxDate(), 1)} // 동적으로 계산된 maxDate를 전달
            locale={ko}
            color={"#00B488"}
            onShownDateChange={(e) => {
              setMonth(e.getMonth() + 1);
              setYear(e.getFullYear());
            }}
          />
          <div
            className={
              "absolute left-[50%] top-10 translate-x-[-50%] font-semibold"
            }
          >
            {year}.{month}
          </div>
        </div>
      </section>
      <div className={"flex w-full justify-center pt-[1rem]"}>
        <button
          className={`h-[3.375rem] min-w-[18.625rem] rounded-[1.75rem] bg-main px-[3.5rem] py-[1rem] text-white disabled:bg-gray1`}
          onClick={() => submitHandler()}
          disabled={
            !(
              isAfter(new Date(deadlineDate), subDays(new Date(), 1)) &&
              isBefore(new Date(deadlineDate), getMaxDate())
            )
          }
        >
          {format(new Date(deadlineDate), "yyyy년 MM월 dd일")} 적용하기
        </button>
      </div>
    </div>
  );
};

export default GatheringDeadlineModal;
