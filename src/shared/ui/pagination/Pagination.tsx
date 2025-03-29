"use client";

import { useRouter } from "next/navigation";
import { AiOutlineEllipsis } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFirstPage, MdLastPage } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const pageList = Array.from({ length: totalPages }, (_, index) => index + 1);
  const leftPage = Math.max(currentPage - 2, 1);
  const rightPage = Math.min(leftPage + 4, totalPages);
  const router = useRouter();

  const pageHandler = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    router.push(url.toString(), { scroll: false });
  };

  return (
    <div className="flex flex-row items-center justify-center gap-3 py-12 text-sm text-black">
      {currentPage > 1 ? (
        <button onClick={() => pageHandler(1)}>
          <MdFirstPage
            className="hover:text-main cursor-pointer"
            size="1.1rem"
          />
        </button>
      ) : (
        <div className="aspect-square w-[0.875rem]"> </div>
      )}
      {currentPage > 1 ? (
        <button onClick={() => pageHandler(currentPage - 1)}>
          <IoIosArrowBack className="hover:text-main" />
        </button>
      ) : (
        <div className="aspect-square w-[0.875rem]" />
      )}
      {leftPage > 1 && (
        <div className="flex flex-row items-center gap-3">
          <button
            onClick={() => pageHandler(1)}
            className="hover:text-main flex h-6 w-6 items-center justify-center"
          >
            1
          </button>
          <AiOutlineEllipsis />
        </div>
      )}
      {pageList.slice(leftPage - 1, rightPage).map((pageNumber) => (
        <button
          key={pageNumber}
          className={[
            pageNumber === currentPage ? "bg-main text-white" : "",
            "hover:text-main flex h-6 w-6 items-center justify-center rounded-full",
          ].join(" ")}
          onClick={() => pageHandler(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {rightPage < totalPages && (
        <div className="flex flex-row items-center gap-3">
          <AiOutlineEllipsis />
          <button
            className="hover:text-main flex h-6 w-6 items-center justify-center"
            onClick={() => pageHandler(totalPages)}
          >
            {totalPages}
          </button>
        </div>
      )}
      {currentPage < totalPages ? (
        <button onClick={() => pageHandler(currentPage + 1)}>
          <IoIosArrowForward className="hover:text-main" />
        </button>
      ) : (
        <div className="aspect-square w-[0.875rem]"> </div>
      )}
      {currentPage < totalPages ? (
        <button onClick={() => pageHandler(totalPages)}>
          <MdLastPage
            className="hover:text-main cursor-pointer"
            size="1.1rem"
          />
        </button>
      ) : (
        <div className="aspect-square w-[0.875rem]" />
      )}
    </div>
  );
};
