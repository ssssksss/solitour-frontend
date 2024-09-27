import { GatheringCategoryListType } from "@/types/GatheringCategoryDto";

interface IGatheringCategoryList {
  changeGatheringCategoryHandler: (id: number) => void;
  loading: boolean;
  gatheringCategoryList: GatheringCategoryListType;
  activeGatheringCategoryId: number;
}
const GatheringCategoryList = ({
  changeGatheringCategoryHandler,
  loading,
  gatheringCategoryList,
  activeGatheringCategoryId,
}: IGatheringCategoryList) => {
  if (loading)
    return (
      <div className="flex animate-pulse flex-wrap items-center gap-2 text-left">
        {Array.from({ length: 2 }, (i) => i).map((_, index) => (
          <div
            key={index}
            className="h-[2rem] w-[4rem] rounded-xl border-2 border-[#E9EBED] bg-gray-300 px-3 py-[0.375rem] text-sm font-medium hover:scale-105"
          ></div>
        ))}
      </div>
    );

  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-wrap items-center gap-1">
        <button
          onClick={() => changeGatheringCategoryHandler(0)}
          className={`rounded-full px-3 py-[0.375rem] text-sm font-medium hover:scale-105 focus:outline-none ${activeGatheringCategoryId == 0 ? "bg-main text-white" : "border-[0.0625rem] border-[#E9EBED] text-gray1"}`}
        >
          전체
        </button>
        {gatheringCategoryList.map((i) => (
          <button
            key={i.id}
            onClick={() => changeGatheringCategoryHandler(i.id)}
            className={`rounded-full px-3 py-[0.375rem] text-sm font-medium hover:scale-105 focus:outline-none ${activeGatheringCategoryId == i.id ? "bg-main text-white" : "border-[0.0625rem] border-[#E9EBED] text-gray1"}`}
          >
            {i.name}
          </button>
        ))}
      </div>
    </div>
  );
};
export default GatheringCategoryList;
