"use client";

import Image from "next/image";
import { useNoticeSearch } from "../model/useNoticeSearch";

interface NoticeSearchProps {
  loading: boolean;
}

export const NoticeSearch = ({ loading }: NoticeSearchProps) => {
  const { searchValue, setSearchValue, handleSearchClick } = useNoticeSearch();

  if (loading) {
    return (
      <div className="relative flex h-11 w-[21.4375rem] shrink-0 animate-pulse items-center rounded-xl bg-gray-300 text-left" />
    );
  }

  return (
    <div className="flex max-w-[21.4375rem] flex-row items-center gap-4">
      <div className="relative z-1 flex flex-row items-center max-[744px]:w-full">
        <input
          className="border-gray3 placeholder:text-gray2 h-11 rounded-full border bg-white pl-4.5 text-sm outline-hidden placeholder:font-medium max-[1024px]:w-full"
          type="text"
          autoComplete="search"
          placeholder="검색하기"
          value={searchValue}
          maxLength={50}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
        />
        <button
          className="bg-lightgreen absolute top-1.25 right-1.5 flex h-8.5 w-8.5 items-center justify-center rounded-full hover:scale-110"
          onClick={() => handleSearchClick()}
        >
          <Image
            src="/icons/search-icon.svg"
            alt="search-icon"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
};
