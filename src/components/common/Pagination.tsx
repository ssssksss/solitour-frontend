import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// TODO
const Pagination = () => {
  return (
    <div className="text-gray1 flex flex-row items-center justify-center space-x-6 p-12 text-sm">
      <div className="cursor-pointer font-semibold hover:text-main">
        <IoIosArrowBack size={"1rem"} />
      </div>
      <Link
        className="text-gray1 font-semibold hover:text-main"
        href="/informations/restaurant"
      >
        1
      </Link>
      <Link
        className="text-gray1 font-semibold hover:text-main"
        href="/informations/restaurant"
      >
        2
      </Link>
      <Link
        className="text-gray1 font-semibold hover:text-main"
        href="/informations/restaurant"
      >
        3
      </Link>
      <Link
        className="text-gray1 font-semibold hover:text-main"
        href="/informations/restaurant"
      >
        4
      </Link>
      <Link
        className="text-gray1 font-semibold hover:text-main"
        href="/informations/restaurant"
      >
        5
      </Link>
      <Link
        className="text-gray1 font-semibold hover:text-main"
        href="/informations/restaurant"
      >
        6
      </Link>
      <div className="cursor-pointer font-semibold hover:text-main">
        <IoIosArrowForward size={"1rem"} />
      </div>
    </div>
  );
};

export default Pagination;
