"use client";

import { ModalTemplate } from "@/shared/ui/modal";
import { format, isAfter, isBefore, subDays } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar } from "react-date-range";
import { useGatheringDeadlineModal } from "../model/useGatheringDeadlineModal";

interface GatheringDeadlineModalProps {
  closeModal: () => void;
}

export const GatheringDeadlineModal = ({
  closeModal,
}: GatheringDeadlineModalProps) => {
  const {
    year,
    month,
    deadlineDate,
    setYear,
    setMonth,
    getMaxDate,
    handleDateSelect,
    handleSubmit,
  } = useGatheringDeadlineModal(closeModal);

  return (
    <ModalTemplate
      className="max-h-152 w-[calc(100vw-1rem)] max-w-100 p-6"
      closeModal={closeModal}
    >
      <h2 className="h-8 text-2xl font-bold text-black">모임 마감일 선택</h2>
      <article className="relative">
        <Calendar
          date={deadlineDate}
          onChange={handleDateSelect}
          minDate={new Date()}
          maxDate={subDays(getMaxDate(), 1)} // 동적으로 계산된 maxDate를 전달
          locale={ko}
          color="#00B488"
          onShownDateChange={(e) => {
            setMonth(e.getMonth() + 1);
            setYear(e.getFullYear());
          }}
        />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 font-semibold">
          {year}.{month}
        </div>
      </article>
      <button
        className="bg-main disabled:bg-gray1 h-13.5 min-w-74.5 rounded-[1.75rem] text-white hover:scale-105"
        onClick={() => handleSubmit()}
        disabled={
          !(
            isAfter(new Date(deadlineDate), subDays(new Date(), 1)) &&
            isBefore(new Date(deadlineDate), getMaxDate())
          )
        }
      >
        {format(new Date(deadlineDate), "yyyy년 MM월 dd일")} 적용하기
      </button>
    </ModalTemplate>
  );
};
