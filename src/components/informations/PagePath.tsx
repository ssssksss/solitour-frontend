import { IoIosArrowForward } from "react-icons/io";
import { IoHome } from "react-icons/io5";

type MyProps = {
  category: string;
};

const PagePath = ({ category }: MyProps) => {
  return (
    <div className="flex w-[60rem] flex-row items-center space-x-1 py-10 text-xs font-medium text-gray2 max-[1024px]:w-[90%] dark:text-slate-400">
      <IoHome />
      <IoIosArrowForward />
      <p>정보</p>
      <IoIosArrowForward />
      <p className="font-semibold text-gray1 dark:text-slate-200">{category}</p>
    </div>
  );
};

export default PagePath;
