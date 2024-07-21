import { IoIosArrowDown } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import InformationFilterModalContainer from "@/containers/informations/list/InformationFilterModalContainer";

interface Props {
  place: string;
  modalVisible: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const InformationSearch = ({
  place,
  modalVisible,
  closeModal,
  openModal,
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
          autoComplete="search"
          name="search"
          placeholder="제목 또는 키워드를 검색해보세요."
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
        <button className="flex flex-row items-center text-gray1 hover:text-main dark:text-slate-400">
          <p>인기순</p>
          <IoIosArrowDown />
        </button>
      </div>
    </div>
  );
};

export default InformationSearch;
