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
        "scrollbar-hide relative h-full max-h-[21.75rem] max-[440px]:max-h-[24rem] w-[calc(100vw-1rem)] max-w-[30rem] overflow-y-scroll rounded-2xl bg-white p-[1rem]"
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
      <h2 className={"h-[2rem] text-2xl font-bold text-black mt-[2rem]"}> 시간 선택 </h2>
      <div className={"flex flex-col items-center gap-[1.875rem] pt-[3rem]"}>
        <div
          className={
            "flex w-full justify-center gap-[1.25rem] max-[440px]:grid max-[440px]:grid-cols-2"
          }
        >
          {/* 날짜 */}
          <div
            className={
              "w-[9.875rem] rounded-[4rem] px-[1.5rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] max-[440px]:col-span-2 max-[440px]:w-full max-[440px]:text-center"
            }
          >
            {format(calendarDate[0].startDate, "yyyy-MM-dd(EE)", {
              locale: ko,
            })}
          </div>
          {/* 시 */}
          <div className="flex w-[6.375rem] gap-2 max-[440px]:w-full">
            <select
              name="hour"
              className={
                "w-[5rem] cursor-pointer rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] max-[440px]:w-full max-[440px]:text-center"
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
          </div>
          {/* 분 */}
          <div className="flex w-[6.375rem] gap-2 max-[440px]:w-full">
            <select
              name="minute"
              className={
                "w-[5rem] cursor-pointer rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] max-[440px]:w-full max-[440px]:text-center"
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
        </div>
        <div className={"flex w-full justify-center gap-[1rem] pt-[3rem]"}>
          <button
            className={
              "h-[3.375rem] w-full max-w-[18.75rem] rounded-[1.75rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1"
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
