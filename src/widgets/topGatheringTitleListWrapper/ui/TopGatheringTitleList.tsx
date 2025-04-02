import { getTopGatheringTitleList } from "@/entities/gathering";
import { TopTitleList } from "@/shared/ui/topTitleList";

export const TopGatheringTitleList = async () => {
  const topGatheringTitleList = await getTopGatheringTitleList();

  return (
    <div className="-mt-28 w-full max-lg:-mt-24">
      <TopTitleList
        title="모임"
        href="gathering"
        topTitleList={topGatheringTitleList}
      />
    </div>
  );
};
