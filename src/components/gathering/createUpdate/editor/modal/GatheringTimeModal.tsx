import "@/styles/reactDataRange.css";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
interface IGatheringTimeModalProps {
  closeModal: () => void;
}

const GatheringTimeModal = (props: IGatheringTimeModalProps) => {
  const formContext = useFormContext();
  const [startDateTime, setStartDateTime] = useState({
    hour: formContext.getValues("scheduleStartDate")
      ? +format(new Date(formContext.getValues("scheduleStartDate")), "HH")
      : new Date().getHours(),
    minute: formContext.getValues("scheduleStartDate")
      ? +format(new Date(formContext.getValues("scheduleStartDate")), "mm")
      : Math.min(50, Math.ceil(new Date().getMinutes() / 10) * 10),
  });
  const [calendarDate, setCalendarDate] = useState([
    {
      startDate: formContext.getValues("scheduleStartDate")
        ? new Date(formContext.getValues("scheduleStartDate"))
        : new Date(),
      endDate: formContext.getValues("scheduleEndDate")
        ? new Date(formContext.getValues("scheduleEndDate"))
        : new Date(),
      key: "selection",
    },
  ]);

  const submitHandler = () => {
    formContext.setValue(
      "scheduleStartDate",
      format(
        new Date(formContext.getValues("scheduleStartDate")),
        "yyyy-MM-dd ",
      ) +
        (startDateTime.hour+"").padStart(2,"0") +
        ":" +
        (startDateTime.minute+"").padStart(2,"0"),
    );
    formContext.watch();
    formContext.trigger(["scheduleStartDate"]);
    props.closeModal();
  };

  return (
        <div
      className={
        "relative h-full max-h-[22rem] w-[calc(100vw-1rem)] overflow-y-scroll rounded-2xl bg-white p-[2.75rem] scrollbar-hide max-w-[30rem]"
      }
    >
    <div
      className={
        "flex min-h-full flex-col justify-start items-start bg-white"
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
      <h2 className={"w-full text-2xl font-bold text-black text-start"}> 시간 선택 </h2>
      <div className={"flex w-full flex-col gap-x-[1.25rem]"}>
        <div
          className={
            "flex w-full justify-center gap-[1.25rem] max-[440px]:flex-col max-[440px]:p-[2.875rem_0px_1.6875rem_0px] py-[4.1875rem]"
          }
        >
          {/* 날짜 */}
          <article
            className={
              "w-[9.75rem] rounded-[4rem] px-[1.5rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] max-[440px]:col-span-2"
            }
          >
            {format(calendarDate[0].startDate, "yyyy.MM.dd(EE)", {
              locale: ko,
            })}
          </article>
          <div className="flex w-full gap-[1.25rem]">
            {/* 시 */}
            <article className="relative flex h-[2.75rem] w-[6.375rem] gap-[6px]">
              <select
                name="hour"
                className={
                  "w-[5.125rem] cursor-pointer appearance-none rounded-[4rem] pl-[1.3125rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
                }
                onChange={(e) =>
                  setStartDateTime((prev) => ({
                    ...prev,
                    hour: +e.target.value,
                  }))
                }
                value={startDateTime.hour}
              >
                {Array.from({ length: 24 }, (_, i) => i).map((i) => (
                  <option value={i} key={i} defaultChecked={i == 12}>
                    {i}
                  </option>
                ))}
              </select>
              <div className="absolute left-[3.25rem] top-1/2 -translate-y-1/2">
                <Image
                  src="/common/dropdown-down-arrow.svg"
                  alt="location-icon"
                  width={8}
                  height={4}
                />
              </div>
              <div className={"flex items-center"}> 시 </div>
            </article>
            {/* 분 */}
            <article className="relative flex h-[2.75rem] w-[6.375rem] gap-[6px]">
              <select
                name="minute"
                className={
                  "w-[5.125rem] cursor-pointer appearance-none rounded-[4rem] pl-[1.3125rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
                }
                onChange={(e) =>
                  setStartDateTime((prev) => ({
                    ...prev,
                    minute: +e.target.value,
                  }))
                }
                value={startDateTime.minute}
              >
                {Array.from(
                  [...Array(6).fill(0)],
                  (i, index) => index * 10,
                ).map((i) => (
                  <option value={i} selected={i == 0} key={i} defaultValue={0}>
                    {i}
                  </option>
                ))}
              </select>
              <div className="absolute left-[3.25rem] top-1/2 -translate-y-1/2">
                <Image
                  src="/common/dropdown-down-arrow.svg"
                  alt="location-icon"
                  width={8}
                  height={4}
                />
              </div>
              <div className={"flex items-center"}> 분 </div>
            </article>
          </div>
        </div>
        </div>
        <div className={"flex justify-center w-full"}>
      <button
        className={
          "h-[3.375rem] w-full max-w-[18.625rem] flex-shrink-0 rounded-[1.75rem] bg-main text-white disabled:bg-gray1"
        }
        onClick={() => submitHandler()}
        >
        적용하기
      </button>
        </div>
    </div>
    </div>
  );
};
export default GatheringTimeModal;

// flex 요소 때문에 줄어들고 있음