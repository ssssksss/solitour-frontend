"use client"

import GatheringCardListContainer from "@/containers/gathering/GatheringCardListContainer";
import GatheringCategoryListContainer from "@/containers/gathering/GatheringCategoryListContainer";
import GatheringExcludeCompleteContainer from "@/containers/gathering/GatheringExcludeCompleteContainer";
import GatheringFilterContainer from "@/containers/gathering/GatheringFilterContainer";
import GatheringSearchContainer from "@/containers/gathering/GatheringSearchContainer";
import GatheringSortContainer from "@/containers/gathering/GatheringSortContainer";
import { GatheringCategoryListType } from "@/types/GatheringCategoryDto";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface IGatheringList {
  gatheringCategoryList: GatheringCategoryListType;
}

const GatheringList = (props: IGatheringList) => {

  return (
    <div className="w-full flex flex-col pt-[5.5rem]">
      <article className="flex flex-col gap-y-4 max-[768px]:items-start max-[768px]:space-y-6 max-[768px]:space-y-reverse">
        <div className="w-full flex flex-row max-[744px]:flex-col max-[744px]:gap-y-5  justify-between items-center  max-[768px]:w-full max-[768px]:justify-between">
          <GatheringSearchContainer />
          <div className="max-[745px]:w-full flex flex-row justify-between items-center gap-4 text-sm font-medium text-gray1 ">
            <div className={"flex gap-4"}>
            <GatheringFilterContainer />
            <GatheringSortContainer />
            </div>
            <div className="min-[745px]:hidden">
            <GatheringExcludeCompleteContainer />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <GatheringCategoryListContainer gatheringCategoryList={props.gatheringCategoryList} />
          <div className="max-[744px]:hidden min-w-max ">
            <GatheringExcludeCompleteContainer />
          </div>
        </div>
      </article>
      <GatheringCardListContainer />
    </div>
  );
};
export default GatheringList;
