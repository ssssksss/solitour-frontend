import InformationFilterModalContainer from "@/containers/informations/list/InformationFilterModalContainer";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";

interface Props {
  pathname: string;
  parentCategoryId: string;
  childCategoryId: string | null;
  place: string;
  order: string;
  searchMethod: string;
  searchValue: string;
  modalVisible: boolean;
  orderDropdownVisible: boolean;
  searchDropdownVisible: boolean;
  onChangeSearchValue: (value: string) => void;
  closeModal: () => void;
  openModal: () => void;
  onOrderDropdownClick: () => void;
  onSearchDropdownClick: () => void;
  onSearchClick: () => void;
  setSearchMethod: (value: string) => void;
}

const InformationSearch = ({
  pathname,
  parentCategoryId,
  childCategoryId,
  place,
  order,
  searchMethod,
  searchValue,
  modalVisible,
  orderDropdownVisible,
  searchDropdownVisible,
  onChangeSearchValue,
  closeModal,
  openModal,
  onOrderDropdownClick,
  onSearchDropdownClick,
  setSearchMethod,
  onSearchClick,
}: Props) => {
  return (
    <div className="flex flex-row items-center gap-4 max-[1024px]:w-full max-[1024px]:justify-between max-[744px]:flex-col max-[744px]:items-start">
      {modalVisible && (
        <InformationFilterModalContainer closeModal={closeModal} />
      )}
      <form
        className="relative z-[1] flex flex-row items-center bg-white max-[1024px]:flex-1 max-[744px]:w-full"
        action={() => onSearchClick()}
      >
        <button
          className="absolute left-0 top-0 flex h-[2.75rem] flex-row items-center gap-2 pl-[1.125rem] text-sm text-gray1 hover:text-main"
          type="button"
          onClick={() => onSearchDropdownClick()}
        >
          <p>{searchMethod}</p>
          <IoIosArrowDown className="mt-1" />
        </button>
        <div
          className={`${!searchDropdownVisible && "hidden"} absolute left-0 top-[0.5625rem] -z-10 flex w-[4.8125rem] flex-col items-center gap-1 rounded-xl bg-white/95 pt-[2.1875rem] text-gray1 shadow`}
          onClick={() => onSearchDropdownClick()}
        >
          <button
            className={`${searchMethod === "제목" && "text-main"} h-[3.75rem] w-[4.6875rem] hover:text-main`}
            type="button"
            onClick={() => setSearchMethod("제목")}
          >
            제목
          </button>
          <button
            className={`${searchMethod === "태그" && "text-main"} h-[3.75rem] w-[4.6875rem] hover:text-main`}
            type="button"
            onClick={() => setSearchMethod("태그")}
          >
            태그
          </button>
        </div>
        <p className="absolute left-[4.6875rem] top-2 text-gray3">|</p>
        <input
          className="h-[2.75rem] w-[21.4375rem] rounded-full border-[0.0625rem] border-gray3 bg-white pl-[5.8125rem] pr-12 text-sm outline-none placeholder:font-medium placeholder:text-gray2 max-[1024px]:w-full"
          type="text"
          placeholder="검색하기"
          value={searchValue}
          onChange={(e) => onChangeSearchValue(e.target.value)}
        />
        <button
          className="absolute right-[0.375rem] top-[0.3125rem] flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full bg-[#F2FAF7] hover:scale-110"
          onClick={() => onSearchClick()}
        >
          <Image
            src="/common/search-icon.png"
            alt="search-icon"
            width={16}
            height={16}
          />
        </button>
      </form>
      <div className="flex flex-row items-center gap-4 text-sm font-medium">
        <button
          className={`${place === "" ? "text-gray1" : "text-main"} flex flex-row items-center hover:text-main`}
          onClick={openModal}
        >
          <VscSettings size={"1.25rem"} />
          <p className="text-nowrap">{place === "" ? "지역별" : place}</p>
        </button>
        <div className="relative">
          <button
            className="flex flex-row items-center text-gray1 hover:text-main"
            onClick={() => onOrderDropdownClick()}
          >
            <p className="text-nowrap">{`${order === "latest" ? "최신순" : order === "likes" ? "좋아요순" : "조회순"}`}</p>
            <IoIosArrowDown />
          </button>
          <div
            className={`${!orderDropdownVisible && "hidden"} absolute -left-[4.5rem] top-7 z-10 flex w-[8.625rem] flex-col items-center gap-1 rounded-xl bg-white/95 text-gray1 shadow`}
            onClick={() => onOrderDropdownClick()}
          >
            <Link
              className={`${order === "latest" && "text-main"} flex h-16 w-full items-center justify-center hover:text-main`}
              href={`${pathname}?page=1&parentCategoryId=${parentCategoryId}${childCategoryId !== null ? `&childCategoryId=${childCategoryId}` : ""}${place !== "" ? `&place=${place}` : ""}&order=latest${searchValue !== "" ? `${searchMethod === "제목" ? "&search" : "&tagName"}=${searchValue}` : ""}`}
              scroll={false}
            >
              최신순
            </Link>
            <Link
              className={`${order === "likes" && "text-main"} flex h-16 w-full items-center justify-center hover:text-main`}
              href={`${pathname}?page=1&parentCategoryId=${parentCategoryId}${childCategoryId !== null ? `&childCategoryId=${childCategoryId}` : ""}${place !== "" ? `&place=${place}` : ""}&order=likes${searchValue !== "" ? `${searchMethod === "제목" ? "&search" : "&tagName"}=${searchValue}` : ""}`}
              scroll={false}
            >
              좋아요순
            </Link>
            <Link
              className={`${order === "views" && "text-main"} flex h-16 w-full items-center justify-center hover:text-main`}
              href={`${pathname}?page=1&parentCategoryId=${parentCategoryId}${childCategoryId !== null ? `&childCategoryId=${childCategoryId}` : ""}${place !== "" ? `&place=${place}` : ""}&order=views${searchValue !== "" ? `${searchMethod === "제목" ? "&search" : "&tagName"}=${searchValue}` : ""}`}
              scroll={false}
            >
              조회순
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationSearch;
