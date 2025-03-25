import { Calendar } from "react-date-range";
import { ko } from "date-fns/locale";
import { useDatePickerModal } from "../model/useDatePickerModal";
import { ModalTemplate } from "@/shared/ui/modal";

interface DiaryDateModalProps {
  closeModal: () => void;
}

export const DiaryDateModal = ({ closeModal }: DiaryDateModalProps) => {
  const { date, setDate, handleDateRangeChange } =
    useDatePickerModal(closeModal);

  return (
    <ModalTemplate
      className="w-fit max-w-[calc(100%_-_48px)] gap-4 p-6"
      closeModal={closeModal}
    >
      <div className="relative h-90">
        <Calendar
          date={date}
          onChange={(date) => setDate(date)}
          minDate={new Date("1970-01-01")}
          maxDate={new Date()}
          locale={ko}
          color="#00B488"
          onShownDateChange={(date) => {
            setDate(date);
          }}
        />
        <div className="absolute top-10 left-[50%] translate-x-[-50%] font-semibold">
          <input
            className="w-32 outline-hidden"
            type="month"
            onChange={(e) => {
              if (e.target.valueAsDate) {
                setDate(e.target.valueAsDate);
              }
            }}
            min="1970-01"
            max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`}
            value={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`}
          />
        </div>
      </div>
      <button
        className="bg-main z-10 min-h-10 w-32 self-center rounded-full text-[0.9375rem] text-white hover:scale-105"
        type="button"
        onClick={handleDateRangeChange}
      >
        적용하기
      </button>
    </ModalTemplate>
  );
};
