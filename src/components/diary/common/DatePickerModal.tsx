import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "@/styles/reactDataRange.css";
import { MdClose } from "react-icons/md";
import { Calendar } from "react-date-range";
import { ko } from "date-fns/locale";
import { useDatePickerModal } from "@/hooks/diary/common/useDatePickerModal";

interface DatePickerModalProps {
  closeModal: () => void;
}

const DatePickerModal = ({ closeModal }: DatePickerModalProps) => {
  const { date, setDate, handleDateRangeChange } =
    useDatePickerModal(closeModal);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit max-h-[calc(100%_-_48px)] w-fit max-w-[90%] flex-col gap-4 overflow-y-auto rounded-xl bg-white p-6">
        <div className="flex flex-row items-center justify-end">
          <MdClose
            className="cursor-pointer text-gray2 hover:text-main"
            size={"2.5rem"}
            onClick={() => closeModal()}
          />
        </div>
        <div className="relative h-[22.5rem]">
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
          <div className="absolute left-[50%] top-10 translate-x-[-50%] font-semibold">
            <input
              className="w-32 outline-none"
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
          className="z-10 min-h-10 w-32 self-center rounded-full bg-main text-[0.9375rem] text-white hover:scale-105"
          type="button"
          onClick={handleDateRangeChange}
        >
          적용하기
        </button>
      </div>
    </div>
  );
};

export default DatePickerModal;
