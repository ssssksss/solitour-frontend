import { IoIosArrowDown } from "react-icons/io";
import PointHistoryItem from "./PointHistoryItem";

const PointHistoryList = () => {
  return (
    <div className="flex flex-col items-center gap-14 pb-40">
      <div className="w-full">
        <PointHistoryItem />
        <PointHistoryItem />
      </div>
      <button className="flex h-[2.625rem] w-[7.5rem] flex-row items-center justify-center gap-2 rounded-3xl border border-[#E3E3E3] text-[0.9375rem] text-black hover:border-main hover:text-main">
        더보기
        <IoIosArrowDown />
      </button>
    </div>
  );
};

export default PointHistoryList;
