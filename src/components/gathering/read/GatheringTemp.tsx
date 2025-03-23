import GatheringSort from "@/components/gathering/read/GatheringSort";
import GatheringSearch from "./GatheringSearch";
import GatheringExcludeComplete from "./GatheringExcludeComplete";
import GatheringCategoryList from "./GatheringCategoryList";
import GatheringFilterModal from "./GatheringFilterModal";
import { getGatheringCategoryList } from "@/entities/gathering";
import { GatheringList } from "@/widgets/gatheringList";

export const GatheringTemp = async () => {
  const gatheringCategoryList = await getGatheringCategoryList();

  return (
    <div className="flex w-full min-w-[19.1875rem] flex-col pt-[5.5rem]">
      <article className="flex flex-col gap-y-4 min-[960px]:flex-row-reverse min-[960px]:gap-x-6">
        <div className="flex w-full flex-row justify-between gap-x-2 gap-y-5 max-[744px]:flex-col min-[960px]:gap-x-6">
          <GatheringSearch />
          <div className="text-gray1 flex flex-row items-center justify-between gap-4 text-sm font-medium max-[744px]:w-full">
            <div className="z-10 flex w-[7.5rem] justify-between gap-4">
              <GatheringFilterModal />
              <GatheringSort />
            </div>
            <div className="min-[745px]:hidden">
              <GatheringExcludeComplete />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <GatheringCategoryList
            gatheringCategoryList={gatheringCategoryList}
          />
          <div className="flex min-w-max max-[744px]:hidden">
            <GatheringExcludeComplete />
          </div>
        </div>
      </article>
      <GatheringList />
    </div>
  );
};
