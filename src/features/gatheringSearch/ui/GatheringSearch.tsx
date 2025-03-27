"use client";

import Image from "next/image";
import { useGatheringSearch } from "../model/useGatheringSearch";
import { Dropdown } from "@/shared/ui/dropdown";

const OPTIONS: { value: "제목" | "태그"; name: string }[] = [
  { value: "제목", name: "제목" },
  { value: "태그", name: "태그" },
];

export const GatheringSearch = () => {
  const {
    searchValue,
    dropdownValue,
    setSearchValue,
    dropdownHandler,
    handleSearchClick,
  } = useGatheringSearch();

  return (
    <div className="flex flex-row items-center gap-4 max-[1024px]:justify-between max-[744px]:w-full max-[744px]:flex-col max-[744px]:items-start">
      <div className="relative z-20 flex flex-row items-center max-[744px]:w-full">
        <div className="text-gray1 hover:text-main absolute top-0 left-0 flex h-full flex-row items-center text-sm">
          <Dropdown
            options={OPTIONS}
            dropdownHandler={dropdownHandler}
            value={dropdownValue}
            defaultValue={dropdownValue}
            dropdownContainerStyle={{
              style: "pl-[1.125rem]",
              w: "w-[5rem]",
              h: "h-[2.75rem]",
            }}
            dropdownOptionStyle={{
              w: "w-[5rem]",
              z: "-z-1",
              style: "pt-[2.75rem] rounded-[1.375rem_0rem_0.75rem_0.75rem]",
            }}
          />
        </div>
        <p className="text-gray3 absolute top-2 left-[4.6875rem] text-lg">|</p>
        <input
          className="border-gray3 placeholder:text-gray2 h-[2.75rem] w-[21.4375rem] rounded-full border bg-white pr-12 pl-[5.8125rem] text-sm outline-hidden placeholder:font-medium max-[1024px]:w-full"
          type="text"
          autoComplete="search"
          placeholder="검색하기"
          value={searchValue}
          maxLength={50}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
        />
        <button
          className="bg-lightGreen absolute top-[0.3125rem] right-[0.375rem] flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full hover:scale-110"
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
