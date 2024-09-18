import Link from "next/link";
import { AiOutlineEllipsis } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFirstPage, MdLastPage } from "react-icons/md";

interface Props {
  currentPage: number;
  totalPages: number;
  pathname: string;
}

const DiaryPagination = ({ currentPage, totalPages, pathname }: Props) => {
  const pageList = Array.from({ length: totalPages }, (_, index) => index + 1);
  const leftPage = Math.max(currentPage - 2, 1);
  const rightPage = Math.min(leftPage + 4, totalPages);

  return (
    <div className="mb-[8.625rem] flex flex-row items-center justify-center gap-3 text-sm text-black">
      {currentPage > 1 ? (
        <Link href={`${pathname}?page=1`}>
          <MdFirstPage
            className="cursor-pointer hover:text-main"
            size="1.1rem"
          />
        </Link>
      ) : (
        <MdFirstPage className="text-gray2" size="1.1rem" />
      )}
      {currentPage > 1 ? (
        <Link href={`${pathname}?page=${currentPage - 1}`}>
          <IoIosArrowBack className="cursor-pointer hover:text-main" />
        </Link>
      ) : (
        <IoIosArrowBack className="text-gray2" />
      )}
      {leftPage > 1 && (
        <div className="flex flex-row items-center gap-3">
          <Link
            className="flex h-6 w-6 items-center justify-center hover:text-main"
            href={`${pathname}?page=1`}
          >
            1
          </Link>
          <AiOutlineEllipsis />
        </div>
      )}
      {pageList.slice(leftPage - 1, rightPage).map((pageNumber) => (
        <Link
          key={pageNumber}
          className={`${pageNumber === currentPage ? "bg-main text-white" : ""} flex h-6 w-6 items-center justify-center rounded-full hover:text-main`}
          href={`${pathname}?page=${pageNumber}`}
        >
          {pageNumber}
        </Link>
      ))}
      {rightPage < totalPages && (
        <div className="flex flex-row items-center gap-3">
          <AiOutlineEllipsis />
          <Link
            className="flex h-6 w-6 items-center justify-center hover:text-main"
            href={`${pathname}?page=${totalPages}`}
          >
            {totalPages}
          </Link>
        </div>
      )}
      {currentPage < totalPages ? (
        <Link href={`${pathname}?page=${currentPage + 1}`}>
          <IoIosArrowForward className="cursor-pointer hover:text-main" />
        </Link>
      ) : (
        <IoIosArrowForward className="text-gray2" />
      )}
      {currentPage < totalPages ? (
        <Link href={`${pathname}?page=${totalPages}`}>
          <MdLastPage
            className="cursor-pointer hover:text-main"
            size={"1.1rem"}
          />
        </Link>
      ) : (
        <MdLastPage className="text-gray2" size={"1.1rem"} />
      )}
    </div>
  );
};

export default DiaryPagination;
