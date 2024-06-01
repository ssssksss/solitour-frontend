import { IoIosArrowForward } from "react-icons/io";

type MyProps = {
  category: string;
};

const PagePath = ({ category }: MyProps) => {
  return (
    <div className="flex w-[960px] flex-row items-center space-x-1 py-10 text-xs font-medium text-neutral-500">
      <p>홈</p>
      <IoIosArrowForward />
      <p>정보</p>
      <IoIosArrowForward />
      <p className="font-semibold text-black">{category}</p>
    </div>
  );
};

export default PagePath;
