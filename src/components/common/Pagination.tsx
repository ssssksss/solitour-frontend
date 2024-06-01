import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// TODO
const Pagination = () => {
  return (
    <div className="flex flex-row items-center justify-center space-x-4 p-12 text-neutral-400">
      <div className="cursor-pointer">
        <IoIosArrowBack size={"1rem"} />
      </div>
      <Link href="/informations/restaurant">1</Link>
      <Link href="/informations/restaurant">2</Link>
      <Link href="/informations/restaurant">3</Link>
      <Link href="/informations/restaurant">4</Link>
      <Link href="/informations/restaurant">5</Link>
      <Link href="/informations/restaurant">6</Link>
      <div className="cursor-pointer">
        <IoIosArrowForward size={"1rem"} />
      </div>
    </div>
  );
};

export default Pagination;
