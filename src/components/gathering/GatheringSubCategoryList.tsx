

import { GatheringCategoryListType } from "@/types/GatheringCategoryDto";

interface IGatheringSubCategoryList {
  gatheringCategoryList: GatheringCategoryListType;
  activeGatheringCategoryId: number;
  changeGatheringCategoryHandler: (_id: number) => void;
}

const GatheringSubCategoryList = ({ gatheringCategoryList, activeGatheringCategoryId, changeGatheringCategoryHandler }: IGatheringSubCategoryList) => {

  return (
    <div className="flex flex-wrap items-center gap-1">
              <button onClick={()=>changeGatheringCategoryHandler(0)} className={
            `rounded-full border-2 border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105 ${activeGatheringCategoryId == 0 && "text-white bg-main"}`
          }> 전체 </button>
      {gatheringCategoryList.map((i, index) => (
        <button onClick={()=>changeGatheringCategoryHandler(i.id)} className={
            `rounded-full border-2 border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105 ${activeGatheringCategoryId == i.id && "text-white bg-main"}`
          }> {i.name} </button>
      ))}
    </div>
  );
};

export default GatheringSubCategoryList;
