import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Props {
  pathname: string;
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ pathname, currentPage, totalPages }: Props) => {
  const pageList = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-row items-center justify-center gap-3 p-12 text-sm text-gray1 dark:text-slate-200">
      <div className="cursor-pointer font-medium text-gray2 hover:text-main">
        <IoIosArrowBack size={"1rem"} />
      </div>
      <div className="flex flex-row items-center gap-3">
        {pageList.map((pageNumber) => (
          <Link
            key={pageNumber}
            className={`${pageNumber === currentPage ? "bg-main text-white" : ""} flex h-6 w-6 items-center justify-center rounded-full hover:text-main`}
            href={`${pathname}?page=${pageNumber}`}
          >
            {pageNumber}
          </Link>
        ))}
      </div>
      <div className="cursor-pointer font-medium text-gray2 hover:text-main">
        <IoIosArrowForward size={"1rem"} />
      </div>
    </div>
  );
};

export default Pagination;
