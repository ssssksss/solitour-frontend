import { AiOutlineEllipsis } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFirstPage, MdLastPage } from "react-icons/md";

interface CommentPaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (newPage: number) => void;
}

const CommentPagination = ({
  currentPage,
  totalPages,
  setPage,
}: CommentPaginationProps) => {
  const pageList = Array.from({ length: totalPages }, (_, index) => index + 1);
  const leftPage = Math.max(currentPage - 2, 1);
  const rightPage = Math.min(leftPage + 4, totalPages);

  return (
    <div className="flex flex-row items-center justify-center gap-3 pt-6 text-sm text-black">
      {currentPage > 1 ? (
        <MdFirstPage
          className="cursor-pointer hover:text-main"
          size="1.1rem"
          onClick={() => setPage(1)}
        />
      ) : (
        <MdFirstPage className="text-gray2" size="1.1rem" />
      )}
      {currentPage > 1 ? (
        <IoIosArrowBack
          className="cursor-pointer hover:text-main"
          onClick={() => setPage(currentPage - 1)}
        />
      ) : (
        <IoIosArrowBack className="text-gray2" />
      )}
      {leftPage > 1 && (
        <div className="flex flex-row items-center gap-3">
          <button
            className="flex h-6 w-6 items-center justify-center hover:text-main"
            onClick={() => setPage(1)}
          >
            1
          </button>
          <AiOutlineEllipsis />
        </div>
      )}
      {pageList.slice(leftPage - 1, rightPage).map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${pageNumber === currentPage ? "bg-main text-white" : ""} flex h-6 w-6 items-center justify-center rounded-full hover:text-main`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {rightPage < totalPages && (
        <div className="flex flex-row items-center gap-3">
          <AiOutlineEllipsis />
          <button
            className="flex h-6 w-6 items-center justify-center hover:text-main"
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </button>
        </div>
      )}
      {currentPage < totalPages ? (
        <IoIosArrowForward
          className="cursor-pointer hover:text-main"
          onClick={() => setPage(currentPage + 1)}
        />
      ) : (
        <IoIosArrowForward className="text-gray2" />
      )}
      {currentPage < totalPages ? (
        <MdLastPage
          className="cursor-pointer hover:text-main"
          size={"1.1rem"}
          onClick={() => setPage(totalPages)}
        />
      ) : (
        <MdLastPage className="text-gray2" size={"1.1rem"} />
      )}
    </div>
  );
};

export default CommentPagination;
