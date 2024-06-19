import "@/styles/reactDataRange.css";
import { addDays } from "date-fns";
import ko from "date-fns/locale/ko";
import Image from "next/image";
import { useState } from "react";
import { DateRangePicker } from 'react-date-range';
;

interface IMeetingFilterModalProps {
    closeModal: () => void;
}

const MeetingFilterModal = (props: IMeetingFilterModalProps) => {
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 6),
        key: "selection",
      },
    ]);

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
        <div className={"flex flex-col items-center"}>
          <div className={"h-[2rem] w-full font-bold text-black"}> 일정 </div>
          <div>
            <DateRangePicker
              onChange={() => ""}
              // moveRangeOnFirstSelection={true}
              showDateDisplay={false}
              months={1}
              ranges={state}
              locale={ko}
              rangeColors={["#00B488", "#F2FAF7"]}
              color={"#ff0000"}
            />
          </div>
        </div>
        <div className={"flex flex-col gap-y-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}> 지역 </div>
          <div className={"flex flex-wrap gap-x-[1rem]"}>
            {["전체","서울","부산","제주"].map((i) => (
              <button
                key={i}
                className={
                  "flex h-[2rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] text-gray1 outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]"
                }
              >
                {i}
              </button>
            ))}
          </div>
        </div>
        <div className={"flex flex-col gap-y-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}> 성별 </div>
          <div className={"flex flex-wrap gap-x-[1rem]"}>
            {["전체", "여성", "남성"].map((i) => (
              <button
                key={i}
                className={
                  "flex h-[2rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] text-gray1 outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]"
                }
              >
                {i}
              </button>
            ))}
          </div>
        </div>
        <div className={"flex w-full flex-col gap-y-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}> 나이대 </div>
          <div className="relative w-full">
            <div className="flex w-full gap-x-[.5rem]">
              {["전체","20대", "30대", "40대", "50대", "60대"].map((i) => (
                <button
                  key={i}
                  className={
                    "flex h-[2rem] flex-shrink-0 items-center rounded-[4rem] px-[1rem] py-[.5rem] text-gray1 outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]"
                  }
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={"flex flex-col gap-y-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}> 카테고리 </div>
          <div className={"flex flex-wrap gap-x-[1rem]"}>
            {["전체", "취향", "활동"].map((i) => (
              <button
                key={i}
                className={
                  "flex h-[2rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] text-gray1 outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]"
                }
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      </article>
      <div className={"flex w-full justify-center gap-[1rem] pt-[2rem]"}>
        <button
          className={
            "h-[3rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white"
          }
        >
          적용하기
        </button>
        <button
          className={
            "h-[3rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white"
          }
        >
          초기화
        </button>
      </div>
    </div>
  );
};
export default MeetingFilterModal
