"use client"

import GatheringCardListContainer from "@/containers/gathering/read/GatheringCardListContainer";
import GatheringCategoryListContainer from "@/containers/gathering/read/GatheringCategoryListContainer";
import GatheringExcludeCompleteContainer from "@/containers/gathering/read/GatheringExcludeCompleteContainer";
import GatheringFilterContainer from "@/containers/gathering/read/GatheringFilterContainer";
import GatheringSearchContainer from "@/containers/gathering/read/GatheringSearchContainer";
import GatheringSortContainer from "@/containers/gathering/read/GatheringSortContainer";
import { GatheringCategoryListType } from "@/types/GatheringCategoryDto";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface IGatheringList {
  gatheringCategoryList: GatheringCategoryListType;
}

const GatheringList = (props: IGatheringList) => {

  return (
    <div className="w-full flex flex-col pt-[5.5rem] min-w-[19.1875rem]">
      <article className="flex flex-col gap-y-4 min-[960px]:flex-row-reverse min-[960px]:gap-x-6">
        <div className="w-full flex flex-row gap-x-2 max-[744px]:flex-col justify-between gap-y-5 min-[960px]:gap-x-6 ">
          <GatheringSearchContainer />
          <div className="max-[744px]:w-full flex flex-row justify-between items-center gap-4 text-sm font-medium text-gray1 ">
            <div className={"flex justify-between gap-4 w-[7.5rem] z-10"}>
              <GatheringFilterContainer />
              <GatheringSortContainer />
            </div>
            <div className="min-[745px]:hidden">
            <GatheringExcludeCompleteContainer />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center ">
          <GatheringCategoryListContainer gatheringCategoryList={props.gatheringCategoryList} />
          <div className="flex max-[744px]:hidden min-w-max">
            <GatheringExcludeCompleteContainer />
          </div>
        </div>
      </article>
      <GatheringCardListContainer />
    </div>
  );
};
export default GatheringList;
