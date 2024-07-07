import { IoIosArrowForward } from "react-icons/io";
import { IoHome } from "react-icons/io5";

interface Props {
  first: string;
  second: string;
}

const PagePath = ({ first, second }: Props) => {
  return (
    <div className="flex w-[60rem] flex-row items-center gap-1 py-10 text-xs font-medium text-gray2 max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)] dark:text-slate-400">
      <IoHome />
      <IoIosArrowForward />
      <p>{first}</p>
      <IoIosArrowForward />
      <p className="font-semibold text-gray1 dark:text-slate-200">{second}</p>
    </div>
  );
};

export default PagePath;
