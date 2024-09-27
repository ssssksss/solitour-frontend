"use client";

import GatheringList from "@/components/gathering/read/GatheringList";
import { GatheringCategoryListType } from "@/types/GatheringCategoryDto";

interface IgatheringCategoryList {
  gatheringCategoryList: GatheringCategoryListType;
}

const GatheringListContainer = ({gatheringCategoryList}:IgatheringCategoryList) => {

  return (
    <GatheringList
      gatheringCategoryList={gatheringCategoryList}
    />
  );
};
export default GatheringListContainer;
