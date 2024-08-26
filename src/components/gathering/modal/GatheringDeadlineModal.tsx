import "@/styles/reactDataRange.css";
import { add, format, isValid } from "date-fns";
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
    const scheduleStartDate = formContext.getValues("scheduleStartDate");
    const today = new Date();
    const oneYearFromToday = add(today, { years: 1 });

    if (scheduleStartDate) {
      const scheduleDate = new Date(scheduleStartDate);
      // 날짜가 유효한지 확인
      if (isValid(scheduleDate)) {
        // scheduleStartDate와 오늘 날짜로부터 1년 후 중 더 이른 날짜를 반환
        return new Date(
          Math.min(scheduleDate.getTime(), oneYearFromToday.getTime()),
        );
      }
    }

    // scheduleStartDate가 없거나 유효하지 않으면 1년 후 날짜를 반환
    return oneYearFromToday;
  };

  return (
    <div
      className={
        "relative h-full max-h-[36rem] w-[calc(100vw-1rem)] max-w-[25rem] overflow-y-scroll rounded-2xl bg-white px-[1rem] py-[2.875rem]"
      }
    >
      <button
        className="absolute right-[1rem] top-[1.5rem]"
        onClick={() => props.closeModal()}
      >
        <Image
          src={"/close-icon.svg"}
          alt={"close-icon"}
          width={20}
          height={20}
        />
      </button>
      <h2 className={"h-[2rem] text-2xl font-bold text-black"}> 날짜 선택 </h2>
      <section className={"flex flex-col items-center gap-[1.875rem]"}>
        <div className="relative">
          <Calendar
            date={deadlineDate}
            onChange={handleDateSelect}
            minDate={new Date()}
            maxDate={getMaxDate()} // 동적으로 계산된 maxDate를 전달
            locale={ko}
            color={"#00B488"}
            onShownDateChange={(e) => {
              setMonth(e.getMonth() + 1);
              setYear(e.getFullYear());
            }}
          />
          <div
            className={
              "absolute left-[50%] top-8 translate-x-[-50%] font-semibold"
            }
          >
            {year}.{month}
          </div>
        </div>
      </section>
      <div className={"flex w-full justify-center pt-[1rem]"}>
        <button
          className={`h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1`}
          onClick={() => submitHandler()}
        >
          {format(new Date(deadlineDate), "yyyy년 MM월 dd일")} 적용하기
        </button>
      </div>
    </div>
  );
};

export default GatheringDeadlineModal;
