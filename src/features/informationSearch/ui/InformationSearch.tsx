"use client";

import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { useInformationSearch } from "../model/useInformationSearch";

export const InformationSearch = () => {
  const {
    searchMethod,
    searchValue,
    searchDropdownVisible,
    setSearchDropdownVisible,
    handleSearchMethodChange,
    handleSearchValueChange,
    handleSearchClick,
  } = useInformationSearch();

  return (
    <form
      className="relative z-10 flex flex-row items-center bg-white max-[1024px]:flex-1 max-[744px]:w-full"
      action={handleSearchClick}
    >
      <button
        className="text-gray1 hover:text-main absolute top-0 left-0 flex h-[2.75rem] flex-row items-center gap-2 pl-[1.125rem] text-sm"
        type="button"
        onClick={() => setSearchDropdownVisible(true)}
      >
        <p>{searchMethod}</p>
        <IoIosArrowDown className="mt-1" />
      </button>
      {searchDropdownVisible && (
        <div
          className="text-gray1 absolute top-[0.5625rem] left-0 -z-10 flex w-[4.8125rem] flex-col items-center gap-1 rounded-xl bg-white/95 pt-[2.1875rem] shadow-sm"
          onClick={() => setSearchDropdownVisible(false)}
        >
          <button
            className={`${searchMethod === "제목" && "text-main"} hover:text-main h-[3.75rem] w-[4.6875rem]`}
            type="button"
            onClick={() => handleSearchMethodChange("제목")}
          >
            제목
          </button>
          <button
            className={`${searchMethod === "태그" && "text-main"} hover:text-main h-[3.75rem] w-[4.6875rem]`}
            type="button"
            onClick={() => handleSearchMethodChange("태그")}
          >
            태그
          </button>
        </div>
      )}
      <p className="text-gray3 absolute top-2 left-[4.6875rem]">|</p>
      <input
        className="border-gray3 placeholder:text-gray2 h-[2.75rem] w-[21.4375rem] rounded-full border bg-white pr-12 pl-[5.8125rem] text-sm outline-hidden placeholder:font-medium max-[1024px]:w-full"
        type="text"
        placeholder="검색하기"
        value={searchValue}
        onChange={(e) => handleSearchValueChange(e.target.value)}
      />
      <button
        className="bg-lightgreen absolute top-[0.3125rem] right-[0.375rem] flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full hover:scale-110"
        type="submit"
      >
        <Image
          src="/icons/search-icon.svg"
          alt="search-icon"
          width={16}
          height={16}
        />
      </button>
    </form>
  );
};
