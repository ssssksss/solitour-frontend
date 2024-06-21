import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// TODO
const Pagination = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-3 p-12 text-sm text-gray1">
      <div className="cursor-pointer font-medium text-gray2 hover:text-main">
        <IoIosArrowBack size={"1rem"} />
      </div>
      <Link
        className="flex h-6 w-6 items-center justify-center rounded-full bg-main text-white hover:text-main"
        href="/informations/restaurant"
      >
        1
      </Link>
      <Link
        className="flex h-6 w-6 items-center justify-center rounded-full text-gray1 hover:text-main"
        href="/informations/restaurant"
      >
        2
      </Link>
      <Link
        className="flex h-6 w-6 items-center justify-center rounded-full text-gray1 hover:text-main"
        href="/informations/restaurant"
      >
        3
      </Link>
      <Link
        className="flex h-6 w-6 items-center justify-center rounded-full text-gray1 hover:text-main"
        href="/informations/restaurant"
      >
        4
      </Link>
      <Link
        className="flex h-6 w-6 items-center justify-center rounded-full text-gray1 hover:text-main"
        href="/informations/restaurant"
      >
        5
      </Link>
      <Link
        className="flex h-6 w-6 items-center justify-center rounded-full text-gray1 hover:text-main"
        href="/informations/restaurant"
      >
        6
      </Link>
      <div className="cursor-pointer font-medium text-gray2 hover:text-main">
        <IoIosArrowForward size={"1rem"} />
      </div>
    </div>
  );
};

export default Pagination;
