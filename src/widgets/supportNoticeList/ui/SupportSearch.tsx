"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  loading: boolean;
}

export const SupportSearch = ({ loading }: Props) => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get("search") || searchParams.get("tagName") || "",
  );

  const searchHandler = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (searchValue == params.get("search")) return;
    searchValue == ""
      ? params.delete("search")
      : params.set("search", searchValue);
    params.delete("page");
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  if (loading)
    return (
      <div className="relative flex h-[2.75rem] w-[21.4375rem] shrink-0 animate-pulse items-center rounded-xl bg-gray-300 text-left"></div>
    );

  return (
    <div className="flex max-w-[21.4375rem] flex-row items-center gap-4">
      <div className="relative z-1 flex flex-row items-center max-[744px]:w-full">
        <input
          className="border-gray3 placeholder:text-gray2 h-[2.75rem] rounded-full border bg-white pl-[1.125rem] text-sm outline-hidden placeholder:font-medium max-[1024px]:w-full"
          type="text"
          autoComplete="search"
          placeholder="검색하기"
          value={searchValue}
          maxLength={50}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              searchHandler();
            }
          }}
        />
        <button
          className="bg-lightGreen absolute top-[0.3125rem] right-[0.375rem] flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full hover:scale-110"
          onClick={() => searchHandler()}
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
