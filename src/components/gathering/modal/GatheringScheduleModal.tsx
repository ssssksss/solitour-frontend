import "@/styles/reactDataRange.css";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import Image from "next/image";
import { useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useFormContext } from "react-hook-form";
interface IGatheringScheduleModalProps {
  closeModal: () => void;
}

const GatheringScheduleModal = (props: IGatheringScheduleModalProps) => {
  const [calendarDate, setCalendarDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [startDateTime, setStartDateTime] = useState({
    hour: "09",
    minute: "00",
  });
  const [endDateTime, setEndDateTime] = useState({
    hour: "18",
    minute: "00",
  });
  const formContext = useFormContext();

  const submitHandler = () => {
    const _dateTime = (date: string, hour: string, minute: string) => {
      return date + " " + hour + ":" + minute;
    };
    formContext.setValue(
      "scheduleStartDate",
      _dateTime(
        format(calendarDate[0].startDate, 'yyyy-MM-dd'),
        startDateTime.hour,
        startDateTime.minute,
      ),
    );
    if (calendarDate[0].startDate == calendarDate[0].endDate) {
      formContext.setValue(
        "scheduleEndDate",
        _dateTime(
          format(calendarDate[0].startDate, 'yyyy-MM-dd'),
          startDateTime.hour,
          startDateTime.minute,
        ),
      );
    } else {
      formContext.setValue(
        "scheduleEndDate",
        _dateTime(
          format(calendarDate[0].endDate, 'yyyy-MM-dd'),
          endDateTime.hour,
          endDateTime.minute,
        ),
      );
    }
    formContext.watch();
    formContext.trigger();
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
      <h2 className={"h-[2rem] text-2xl font-bold text-black"}> 일정 선택 </h2>
      <div className={"flex flex-col items-center gap-[.5rem]"}>
        <div className={"h-[2rem] w-full font-bold text-black"}> 일정 </div>
        <div>
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
            showDateDisplay={false}
            months={1}
            ranges={calendarDate}
            locale={ko}
            rangeColors={["#00B488", "#F2FAF7"]}
            color={"#ff0000"}
          />
        </div>
        <div className={"flex h-[4rem] flex-col gap-[.5rem]"}>
          <div className={"flex w-full gap-[.5rem]"}>
            <div className={"flex items-center"}> 시작 : </div>
            <div
              className={
                "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
            >
              {format(calendarDate[0].startDate, 'yyyy-MM-dd')}
            </div>
            <select
              name="hour"
              className={
                "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
              onChange={(e) =>
                setStartDateTime((prev) => ({
                  ...prev,
                  hour: e.target.value.padStart(2, "0"),
                }))
              }
            >
              {Array.from([...Array(24).fill(0)], (i, index) => index).map(
                (i) => (
                  <option value={i} selected={i == 0} key={i}>
                    {i}
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
              onChange={(e) =>
                setStartDateTime((prev) => ({
                  ...prev,
                  minute: e.target.value.padStart(2, "0"),
                }))
              }
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
          <div className={"flex w-full gap-[.5rem]"}>
            <div className={"flex items-center"}> 종료 : </div>
            <div
              className={
                "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
            >
              {format(calendarDate[0].endDate, 'yyyy-MM-dd')}
            </div>
            <select
              name="hour"
              className={
                "rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
              onChange={(e) =>
                setEndDateTime((prev) => ({
                  ...prev,
                  hour: e.target.value.padStart(2, "0"),
                }))
              }
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
              onChange={(e) =>
                setEndDateTime((prev) => ({
                  ...prev,
                  minute: e.target.value.padStart(2, "0"),
                }))
              }
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
        </div>
      </div>
      <div className={"flex w-full justify-center gap-[1rem] pt-[3rem]"}>
        <button
          className={
            "h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1"
          }
          onClick={() => submitHandler()}
          disabled={
            Number(calendarDate[0].startDate) ==
              Number(calendarDate[0].endDate) &&
            Number(startDateTime.hour + startDateTime.minute) >
              Number(endDateTime.hour + endDateTime.minute)
          }
        >
          적용하기
        </button>
      </div>
    </div>
  );
};
export default GatheringScheduleModal;
