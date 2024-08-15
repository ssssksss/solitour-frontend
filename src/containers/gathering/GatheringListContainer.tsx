"use client";

import GatheringList from "@/components/gathering/GatheringList";
import { GatheringCategoryListType } from "@/types/GatheringCategoryDto";

interface IgatheringCategoryList {
  gatheringCategoryList: GatheringCategoryListType;
  sortDefaultValue: string;
}

const GatheringListContainer = ({gatheringCategoryList, sortDefaultValue}:IgatheringCategoryList) => {

  return (
    <GatheringList
      gatheringCategoryList={gatheringCategoryList}
    />
  );
};
export default GatheringListContainer;
