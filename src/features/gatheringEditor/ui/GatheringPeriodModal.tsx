"use client";

import { ModalTemplate } from "@/shared/ui/modal";
import { add, addDays, format, isAfter, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { DateRangePicker } from "react-date-range";
import { useGatheringPeriodModal } from "../model/useGatheringPeriodModal";

interface GatheringPeriodModalProps {
  closeModal: () => void;
}

export const GatheringPeriodModal = ({
  closeModal,
}: GatheringPeriodModalProps) => {
  const {
    formContext,
    year,
    month,
    windowWidth,
    calendarDate,
    setYear,
    setMonth,
    setCalendarDate,
    handleSubmit,
  } = useGatheringPeriodModal(closeModal);

  return (
    <ModalTemplate
      className="max-h-200 w-[calc(100vw-1rem)] max-[799px]:max-w-100 min-[800px]:max-h-144 min-[800px]:w-196"
      closeModal={closeModal}
    >
      <h2 className="mt-8 h-8 text-2xl font-bold text-black">날짜 선택</h2>
      <div className="flex flex-col items-center gap-7.5">
        <div className="relative">
          <DateRangePicker
            onChange={(rangesByKey) => {
              const selection = rangesByKey.selection;
              if (
                selection.startDate &&
                selection.endDate &&
                isSameDay(selection.startDate, selection.endDate)
              ) {
                setMonth(selection.startDate.getMonth() + 1);
              }
              if (
                selection.startDate?.getFullYear() !=
                  selection.endDate?.getFullYear() ||
                selection.startDate?.getMonth() != selection.endDate?.getMonth()
              ) {
                setMonth(selection.startDate!.getMonth() + 1);
                setYear(selection.startDate!.getFullYear());
              }
              setCalendarDate([
                {
                  startDate: selection.startDate as Date,
                  endDate: selection.endDate as Date,
                  key: "selection",
                },
              ]);
            }}
            minDate={
              formContext.getValues("deadline")
                ? addDays(new Date(formContext.getValues("deadline")), 1)
                : addDays(new Date(), 1)
            }
            maxDate={add(new Date(), { years: 1 })}
            showDateDisplay={false}
            months={2}
            ranges={calendarDate}
            locale={ko}
            direction={windowWidth > 799 ? "horizontal" : "vertical"}
            rangeColors={["#00B488", "#F2FAF7"]}
            color="#ff0000"
            onShownDateChange={(e) => {
              setMonth(e.getMonth() + 1);
              setYear(e.getFullYear());
            }}
          />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 font-semibold min-[800px]:left-1/4">
            {year}.{month}
          </div>
          <div className="absolute top-[calc(50%+46px)] left-1/2 -translate-x-1/2 font-semibold min-[800px]:top-6 min-[800px]:left-3/4">
            {year + Math.floor((month + 1) / 12)}.{(month % 12) + 1}
          </div>
        </div>
        <div className="flex w-full justify-center gap-4">
          <button
            className="bg-main disabled:bg-gray1 h-12 rounded-[4rem] px-4 py-2 text-white"
            disabled={
              !(
                isAfter(new Date(calendarDate[0].startDate), new Date()) &&
                isAfter(
                  new Date(calendarDate[0].startDate),
                  new Date(formContext.getValues("deadline")),
                )
              )
            }
            onClick={handleSubmit}
          >
            <span>{format(calendarDate[0].startDate, "yy.MM.dd")}</span>
            {format(calendarDate[0].startDate, "yy.MM.dd") !=
              format(calendarDate[0].endDate, "yy.MM.dd") && (
              <span>{format(calendarDate[0].endDate, "~ yy.MM.dd")}</span>
            )}
            <span className="pl-2 text-[1.1rem]"> 적용하기 </span>
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
};
