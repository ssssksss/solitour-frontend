"use client";

import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { useInformationSearch } from "../model/useInformationSearch";
import { InformationFilterModal } from "./InformationFilterModal";
import { ORDER_LIST } from "../config/orderList";

export const InformationSearch = () => {
  const {
    place,
    order,
    searchMethod,
    searchValue,
    modalVisible,
    orderDropdownVisible,
    searchDropdownVisible,
    openModal,
    closeModal,
    setOrderDropdownVisible,
    setSearchDropdownVisible,
    handleSearchMethodChange,
    handleSearchValueChange,
    handleSearchClick,
    handleOrderClick,
  } = useInformationSearch();

  return (
    <div className="flex flex-row items-center gap-4 max-[1024px]:w-full max-[1024px]:justify-between max-[744px]:flex-col max-[744px]:items-start">
      {modalVisible && <InformationFilterModal closeModal={closeModal} />}
      <form
        className="relative z-10 flex flex-row items-center bg-white max-[1024px]:flex-1 max-[744px]:w-full"
        action={handleSearchClick}
      >
        <button
          className="text-gray1 hover:text-main absolute top-0 left-0 flex h-[2.75rem] flex-row items-center gap-2 pl-[1.125rem] text-sm"
          type="button"
          onClick={() => {
            setOrderDropdownVisible(false);
            setSearchDropdownVisible(true);
          }}
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
      <div className="flex flex-row items-center gap-4 text-sm font-medium">
        <button
          className={`${place === "" ? "text-gray1" : "text-main"} hover:text-main flex flex-row items-center`}
          onClick={openModal}
        >
          <VscSettings size="1.25rem" />
          <p className="text-nowrap">{place === "" ? "지역별" : place}</p>
        </button>
        <div className="relative">
          <button
            className="text-gray1 hover:text-main flex flex-row items-center"
            onClick={() => {
              setSearchDropdownVisible(false);
              setOrderDropdownVisible(true);
            }}
          >
            <p className="text-nowrap">
              {order === "latest"
                ? "최신순"
                : order === "likes"
                  ? "좋아요순"
                  : "조회순"}
            </p>
            <IoIosArrowDown />
          </button>
          {orderDropdownVisible && (
            <div
              className="text-gray1 absolute top-7 -left-[4.5rem] z-10 flex w-[8.625rem] flex-col items-center gap-1 rounded-xl bg-white/95 shadow-sm"
              onClick={() => setOrderDropdownVisible(false)}
            >
              {ORDER_LIST.map((value) => (
                <button
                  key={value.title}
                  className={[
                    order === value.href ? "text-main" : "",
                    "hover:text-main flex h-16 w-full items-center justify-center",
                  ].join(" ")}
                  type="button"
                  onClick={() => handleOrderClick(value.href)}
                >
                  {value.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
