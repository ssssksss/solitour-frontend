import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { MdClose } from "react-icons/md";
import { DateRange } from "react-date-range";
import { Dispatch, SetStateAction } from "react";
import { ko } from "date-fns/locale";

interface Props {
  width: number;
  state: any[];
  setState: Dispatch<SetStateAction<any[]>>;
  closeModal: () => void;
  onChangeDateRange: () => void;
}

const DateRangeModal = ({
  width,
  state,
  setState,
  closeModal,
  onChangeDateRange,
}: Props) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit w-fit flex-col gap-4 rounded-xl bg-white p-6 dark:bg-slate-800">
        <div className="flex flex-row items-center justify-end">
          <MdClose
            className="cursor-pointer text-gray2 hover:text-main dark:text-slate-400"
            size={"2.5rem"}
            onClick={() => closeModal()}
          />
        </div>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          months={width >= 744 ? 2 : 1}
          direction="horizontal"
          minDate={new Date("1970-1-1")}
          maxDate={new Date()}
          locale={ko}
          rangeColors={["#00B488"]}
        />
        <button
          className="mt-4 h-10 w-32 self-center rounded-full bg-main text-[0.9375rem] text-white hover:scale-105"
          type="button"
          onClick={() => onChangeDateRange()}
        >
          적용하기
        </button>
      </div>
    </div>
  );
};

export default DateRangeModal;
