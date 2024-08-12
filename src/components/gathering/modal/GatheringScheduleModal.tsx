import "@/styles/reactDataRange.css";
import { add, format } from "date-fns";
import ko from "date-fns/locale/ko";
import Image from "next/image";
import { useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useFormContext } from "react-hook-form";
interface IGatheringScheduleModalProps {
  closeModal: () => void;
}

const GatheringScheduleModal = (props: IGatheringScheduleModalProps) => {
  const formContext = useFormContext();
  const [calendarDate, setCalendarDate] = useState([
    {
      startDate: formContext.getValues("scheduleStartDate") ? new Date(formContext.getValues("scheduleStartDate")) : new Date(),
      endDate: formContext.getValues("scheduleEndDate") ? new Date(formContext.getValues("scheduleEndDate")) : new Date(),
      key: "selection",
    },
  ]);
  const [startDateTime, setStartDateTime] = useState({
    hour: formContext.getValues("scheduleStartDate") ? +format(new Date(formContext.getValues("scheduleStartDate")),"HH") : new Date().getHours(),
    minute: formContext.getValues("scheduleStartDate") ? +format(new Date(formContext.getValues("scheduleStartDate")),"mm") : Math.min(50, Math.ceil(new Date().getMinutes() / 10) * 10),
  });
  const [endDateTime, setEndDateTime] = useState({
    hour: formContext.getValues("scheduleEndDate") ? +format(new Date(formContext.getValues("scheduleEndDate")),"HH") : 18,
    minute: formContext.getValues("scheduleEndDate") ? +format(new Date(formContext.getValues("scheduleEndDate")),"mm") : 0,
  });
  
  const submitHandler = () => {
    const _dateTime = (date: string, hour: string, minute: string) => {
      return date + " " + hour + ":" + minute;
    };
    formContext.setValue(
      "scheduleStartDate",
      _dateTime(
        format(calendarDate[0].startDate, 'yyyy-MM-dd'),
        startDateTime.hour.toString().padStart(2,"0"),
        startDateTime.minute.toString().padStart(2,"0"),
      ),
    );
    if (calendarDate[0].startDate == calendarDate[0].endDate) {
      formContext.setValue(
        "scheduleEndDate",
        _dateTime(
          format(calendarDate[0].startDate, 'yyyy-MM-dd'),
          startDateTime.hour.toString().padStart(2,"0"),
          startDateTime.minute.toString().padStart(2,"0"),
        ),
      );
    } else {
      formContext.setValue(
        "scheduleEndDate",
        _dateTime(
          format(calendarDate[0].endDate, 'yyyy-MM-dd'),
          endDateTime.hour.toString().padStart(2,"0"),
          endDateTime.minute.toString().padStart(2,"0"),
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
            maxDate={add(new Date(), { years: 1 })}
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
                  hour: +e.target.value,
                }))
              }
              value={startDateTime.hour}
            >
              {Array.from([...Array(24).fill(0)], (i, index) => index).filter(j => {
                if (format(new Date(calendarDate[0].startDate), "yyyy-MM-dd") == format(new Date(), "yyyy-MM-dd")) {
                  if (format(new Date(calendarDate[0].startDate), "yyyy-MM-dd") == format(calendarDate[0].endDate, "yyyy-MM-dd")) {
                    return new Date().getHours() <= j && j <= endDateTime.hour;  
                  }
                  return new Date().getHours() <= j;  
                } else if(format(new Date(calendarDate[0].startDate), "yyyy-MM-dd") == format(calendarDate[0].endDate, "yyyy-MM-dd")) {
                  return j <= endDateTime.hour;
                }
                return true;
              }).map(
                (i) => (
                  <option value={i} key={i}>
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
                  minute: +e.target.value,
                }))
              }
              value={startDateTime.minute}
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
                "w-[4rem] rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
              onChange={(e) =>
                setEndDateTime((prev) => ({
                  ...prev,
                  hour: +e.target.value,
                }))
              }
              value={endDateTime.hour}
            >
              {Array.from([...Array(24).fill(0)], (i, index) => index).filter(j => {
                if (format(new Date(calendarDate[0].endDate), "yyyy-MM-dd") == format(new Date(), "yyyy-MM-dd")) {
                  return new Date().getHours() <= j;  
                }
                return true;
              }).map(
                (i) => (
                  <option value={23 - i} selected={i == 18} key={i}>
                    {23 - i}
                  </option>
                ),
              )}
            </select>
            <div className={"flex items-center"}> 시 </div>
            <select
              name="minute"
              className={
                "w-[4rem] rounded-[1rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
              onChange={(e) =>
                setEndDateTime((prev) => ({
                  ...prev,
                  minute: +e.target.value,
                }))
              }
              value={endDateTime.minute}
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
            Number(startDateTime.hour * 60 + startDateTime.minute) >
              Number(endDateTime.hour * 60 + endDateTime.minute)
          }
        >
          적용하기
        </button>
      </div>
    </div>
  );
};
export default GatheringScheduleModal;
