import { AiOutlineEllipsis } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFirstPage, MdLastPage } from "react-icons/md";

interface CommentPaginationProps {
  currentPage: number;
  leftPage: number;
  rightPage: number;
  pageList: number[];
  totalPages: number;
}

const CommentPagination = ({
  currentPage,
  leftPage,
  rightPage,
  pageList,
  totalPages,
}: CommentPaginationProps) => {
  return (
    <div className="flex flex-row items-center justify-center gap-3 pt-6 text-sm text-black">
      {currentPage > 1 ? (
        <MdFirstPage className="cursor-pointer hover:text-main" size="1.1rem" />
      ) : (
        <MdFirstPage className="text-gray2" size="1.1rem" />
      )}
      {currentPage > 1 ? (
        <IoIosArrowBack className="cursor-pointer hover:text-main" />
      ) : (
        <IoIosArrowBack className="text-gray2" />
      )}
      {leftPage > 1 && (
        <div className="flex flex-row items-center gap-3">
          <button className="flex h-6 w-6 items-center justify-center hover:text-main">
            1
          </button>
          <AiOutlineEllipsis />
        </div>
      )}
      {pageList.slice(leftPage - 1, rightPage).map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${pageNumber === currentPage ? "bg-main text-white" : ""} flex h-6 w-6 items-center justify-center rounded-full hover:text-main`}
        >
          {pageNumber}
        </button>
      ))}
      {rightPage < totalPages && (
        <div className="flex flex-row items-center gap-3">
          <AiOutlineEllipsis />
          <button className="flex h-6 w-6 items-center justify-center hover:text-main">
            {totalPages}
          </button>
        </div>
      )}
      {currentPage < totalPages ? (
        <IoIosArrowForward className="cursor-pointer hover:text-main" />
      ) : (
        <IoIosArrowForward className="text-gray2" />
      )}
      {currentPage < totalPages ? (
        <MdLastPage
          className="cursor-pointer hover:text-main"
          size={"1.1rem"}
        />
      ) : (
        <MdLastPage className="text-gray2" size={"1.1rem"} />
      )}
    </div>
  );
};

export default CommentPagination;
