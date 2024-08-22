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
        startDateTime.hour +
        ":" +
        startDateTime.minute,
    );
    formContext.watch();
    formContext.trigger();
    props.closeModal();
  };

  return (
    <div
      className={
        "relative h-full max-h-[24rem] w-[calc(100vw-1rem)] max-w-[25rem] overflow-y-scroll rounded-2xl bg-white px-[1rem] py-[2.875rem]"
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
      <h2 className={"h-[2rem] text-2xl font-bold text-black"}> 시간 선택 </h2>
      <div className={"flex flex-col items-center gap-[1.875rem] pt-[3rem]"}>
        <div className={"flex w-full justify-between gap-[.5rem]"}>
          <div
            className={
              "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
            }
          >
            {format(calendarDate[0].startDate, "yyyy-MM-dd(EE)", {
              locale: ko,
            })}
          </div>
          <select
            name="hour"
            className={
              "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
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
          <div className={"flex items-center"}> 시 </div>
          <select
            name="minute"
            className={
              "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
            }
            onChange={(e) =>
              setStartDateTime((prev) => ({
                ...prev,
                minute: +e.target.value,
              }))
            }
            value={startDateTime.minute}
          >
            {Array.from([...Array(6).fill(0)], (i, index) => index * 10).map(
              (i) => (
                <option value={i} selected={i == 0} key={i} defaultValue={0}>
                  {i}
                </option>
              ),
            )}
          </select>
          <div className={"flex items-center"}> 분 </div>
        </div>
        <div className={"flex w-full justify-center gap-[1rem] pt-[3rem]"}>
          <button
            className={
              "h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1"
            }
            onClick={() => submitHandler()}
          >
            <span className={"pl-[.5rem] text-[1.1rem]"}> 적용하기 </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default GatheringTimeModal;
