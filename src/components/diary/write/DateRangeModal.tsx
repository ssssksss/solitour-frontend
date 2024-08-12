import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { MdClose } from "react-icons/md";
import { DateRange, RangeKeyDict } from "react-date-range";
import { Dispatch, SetStateAction } from "react";

interface Props {
  state: any[];
  setState: Dispatch<SetStateAction<any[]>>;
  onResetDateRange: () => void;
}

const DateRangeModal = ({ state, setState, onResetDateRange }: Props) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit w-[39.75rem] flex-col rounded-xl bg-white p-6 max-[744px]:w-[calc(100%_-_48px)] dark:bg-slate-800">
        <div className="flex flex-row items-center justify-end">
          <MdClose
            className="cursor-pointer text-gray2 hover:text-main dark:text-slate-400"
            size={"2.5rem"}
            onClick={onResetDateRange}
          />
        </div>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
    </div>
  );
};

export default DateRangeModal;
