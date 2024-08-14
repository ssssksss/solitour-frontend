"use client"

import { Modal } from "@/components/common/modal/Modal";
import { GatheringCategoryListType } from "@/types/GatheringCategoryDto";
import Image from "next/image";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { VscSettings } from "react-icons/vsc";
import Dropdown from "../common/dropdown/Dropdown";
import GatheringFilterModal from "./GatheringFilterModal";
import GatheringSubCategoryList from "./GatheringSubCategoryList";

interface IGatheringList {
  isModal: boolean;
  closeModal: () => void;
  openModal: () => void;
  gatheringCategoryList: GatheringCategoryListType;
  activeGatheringCategoryId: number;
  isExcludeCompleted: boolean;
  checkExcludeCompleteGatheringHandler: () => void;
  changeGatheringCategoryHandler: (_id: number) => void;
  sortHandler: (value: string) => void;
  searchHandler: (value: string) => void;
  keywordRef: React.RefObject<HTMLInputElement>;
  sortDefaultValue: string;
}

const GatheringList = (props: IGatheringList) => {

  return (
    <div className="w-full flex flex-col pt-[5.5rem] ">
      <article className="flex flex-col gap-y-4 max-[768px]:items-start max-[768px]:space-y-6 max-[768px]:space-y-reverse">
        <div className="w-full flex flex-row max-[744px]:flex-col max-[744px]:gap-y-5  justify-between items-center  max-[768px]:w-full max-[768px]:justify-between">
        <label className="relative min-[745px]:w-full min-[745px]:max-w-[28rem] w-full max-[768px]:w-full group">
          <input
            className="bg-[0rem_center] w-full pb-1 pl-8 pr-[3.5rem] border-b-[0.0625rem] border-black bg-search-icon bg-[length:1rem] bg-no-repeat text-sm outline-none placeholder:font-medium placeholder:text-gray2"
            type="text"
            autoComplete="search"
            name="search"
            placeholder="검색하기"
            maxLength={30}
            ref={props.keywordRef}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.ctrlKey && e.key === 'Enter' && props.keywordRef.current) {
                  props.searchHandler(props.keywordRef.current.value);
                }
            }}
          />
          <button
              className="absolute right-[0rem] bg-main text-white px-3 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              onClick={() => {
                    if (props.keywordRef.current) {
                      props.searchHandler(props.keywordRef.current.value);
                    }
              }}  
          >
            검색
          </button>
        </label>
          <div className="max-[745px]:w-full flex flex-row justify-between items-center gap-4 text-sm font-medium text-gray1 ">
            <div className={"flex gap-4"}>
                          <button
              className="flex flex-row items-center hover:text-main"
              onClick={() => props.openModal()}
            >
              <VscSettings size={"1.25rem"} />
              <div>필터</div>
            </button>
            <Modal isOpen={props.isModal} onClose={() => props.closeModal()}>
                <GatheringFilterModal closeModal={() => props.closeModal()} />
            </Modal>
              <Dropdown options={[{
                value: "",
                name: "최신순",
              }, {
                value: "likes",
                name: "인기순",
              }, {
                value: "views",
                name: "조회순",
                }]} dropdownHandler={props.sortHandler} defaultValue={props.sortDefaultValue} />
            </div>
            <button className={"flex gap-1 text-sm text-black font-medium min-[745px]:hidden"}  onClick={props.checkExcludeCompleteGatheringHandler}>
              {
                props.isExcludeCompleted ?
                <Image src="/common/check-active-icon.svg" alt="location-icon" width={20} height={20} /> :
                <Image src="/common/check-empty-icon.svg" alt="location-icon" width={20} height={20} />
              }
              모집완료 제외
            </button>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <GatheringSubCategoryList gatheringCategoryList={props.gatheringCategoryList} activeGatheringCategoryId={props.activeGatheringCategoryId} changeGatheringCategoryHandler={props.changeGatheringCategoryHandler} />
              <button className={"flex gap-1 text-sm text-black font-medium max-[744px]:hidden items-center"} onClick={props.checkExcludeCompleteGatheringHandler}>
              {
                props.isExcludeCompleted ?
                <Image src="/common/check-active-icon.svg" alt="location-icon" width={20} height={20} /> :
                <Image src="/common/check-empty-icon.svg" alt="location-icon" width={20} height={20} />
              }
              모집완료 제외
            </button>
        </div>
      </article>
      <div className="mt-6 grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
        
      </div>
    </div>
  );
};
export default GatheringList;
