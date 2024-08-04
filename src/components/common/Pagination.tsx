import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFirstPage, MdLastPage } from "react-icons/md";

interface Props {
  pathname: string;
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ pathname, currentPage, totalPages }: Props) => {
  const pageList = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-row items-center justify-center gap-3 p-12 text-sm text-gray1 dark:text-slate-200">
      <Link href={`${pathname}?page=1`}>
        <MdFirstPage
          className="flex cursor-pointer flex-row items-center font-medium text-gray2 hover:text-main"
          size={"1.1rem"}
        />
      </Link>

      <IoIosArrowBack className="flex cursor-pointer flex-row items-center font-medium text-gray2 hover:text-main" />
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
      <IoIosArrowForward className="cursor-pointer font-medium text-gray2 hover:text-main" />
      <Link href={`${pathname}?page=${totalPages}`}>
        <MdLastPage
          className="cursor-pointer font-medium text-gray2 hover:text-main"
          size={"1.1rem"}
        />
      </Link>
    </div>
  );
};

export default Pagination;
