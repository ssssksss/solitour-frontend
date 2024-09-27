"use client";

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
    <div className="flex w-full min-w-[19.1875rem] flex-col pt-[5.5rem]">
      <article className="flex flex-col gap-y-4 min-[960px]:flex-row-reverse min-[960px]:gap-x-6">
        <div className="flex w-full flex-row justify-between gap-x-2 gap-y-5 max-[744px]:flex-col min-[960px]:gap-x-6">
          <GatheringSearchContainer />
          <div className="flex flex-row items-center justify-between gap-4 text-sm font-medium text-gray1 max-[744px]:w-full">
            <div className={"z-10 flex w-[7.5rem] justify-between gap-4"}>
              <GatheringFilterContainer />
              <GatheringSortContainer />
            </div>
            <div className="min-[745px]:hidden">
              <GatheringExcludeCompleteContainer />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <GatheringCategoryListContainer
            gatheringCategoryList={props.gatheringCategoryList}
          />
          <div className="flex min-w-max max-[744px]:hidden">
            <GatheringExcludeCompleteContainer />
          </div>
        </div>
      </article>
      <GatheringCardListContainer />
    </div>
  );
};
export default GatheringList;
