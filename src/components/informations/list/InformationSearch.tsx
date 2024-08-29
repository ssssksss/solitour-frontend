import { IoIosArrowDown } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import InformationFilterModalContainer from "@/containers/informations/list/InformationFilterModalContainer";
import Link from "next/link";

interface Props {
  pathname: string;
  parentCategoryId: string;
  childCategoryId: string | null;
  place: string;
  order: string;
  modalVisible: boolean;
  dropdownVisible: boolean;
  closeModal: () => void;
  openModal: () => void;
  onDropdownClick: () => void;
}

const InformationSearch = ({
  pathname,
  parentCategoryId,
  childCategoryId,
  place,
  order,
  modalVisible,
  dropdownVisible,
  closeModal,
  openModal,
  onDropdownClick,
}: Props) => {
  return (
    <div className="flex flex-row items-center gap-4 max-[1024px]:w-full max-[1024px]:justify-between max-[744px]:flex-col max-[744px]:items-start">
      {modalVisible && (
        <InformationFilterModalContainer closeModal={closeModal} />
      )}
      <form className="max-[1024px]:flex-1 max-[744px]:w-full">
        <input
          className="w-64 border-b-[0.0625rem] border-black bg-transparent bg-search-icon bg-[length:1rem] bg-[left_0rem_top_0.1rem] bg-no-repeat pb-1 pl-8 text-sm outline-none placeholder:font-medium placeholder:text-gray2 max-[1024px]:w-full dark:border-slate-200 dark:bg-search-icon-dark-mode"
          type="text"
          placeholder="태그로 검색해보세요."
        />
      </form>
      <div className="flex flex-row items-center gap-4 text-sm font-medium">
        <button
          className={`${place === "" ? "text-gray1 dark:text-slate-400" : "text-main"} flex flex-row items-center hover:text-main`}
          onClick={openModal}
        >
          <VscSettings size={"1.25rem"} />
          <p>{place === "" ? "지역별" : place}</p>
        </button>
        <div className="relative">
          <button
            className="flex flex-row items-center text-gray1 hover:text-main dark:text-slate-400"
            onClick={() => onDropdownClick()}
          >
            <p>{`${order === "latest" ? "최신순" : order === "likes" ? "좋아요순" : "조회순"}`}</p>
            <IoIosArrowDown />
          </button>
          <div
            className={`${!dropdownVisible && "hidden"} absolute -left-4 top-7 z-10 flex w-20 flex-col items-center gap-1 rounded-xl bg-[#F2FAF7] p-2 text-gray1 dark:text-slate-400`}
            onClick={() => onDropdownClick()}
          >
            <Link
              className={`${order === "latest" && "text-main"} hover:text-main`}
              href={`${pathname}?page=1&parentCategoryId=${parentCategoryId}${childCategoryId !== null ? `&childCategoryId=${childCategoryId}` : ""}${place !== "" ? `&place=${place}` : ""}&order=latest`}
              scroll={false}
            >
              최신순
            </Link>
            <Link
              className={`${order === "likes" && "text-main"} hover:text-main`}
              href={`${pathname}?page=1&parentCategoryId=${parentCategoryId}${childCategoryId !== null ? `&childCategoryId=${childCategoryId}` : ""}${place !== "" ? `&place=${place}` : ""}&order=likes`}
              scroll={false}
            >
              좋아요순
            </Link>
            <Link
              className={`${order === "views" && "text-main"} hover:text-main`}
              href={`${pathname}?page=1&parentCategoryId=${parentCategoryId}${childCategoryId !== null ? `&childCategoryId=${childCategoryId}` : ""}${place !== "" ? `&place=${place}` : ""}&order=views`}
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
