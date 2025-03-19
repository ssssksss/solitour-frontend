import { getTopGatheringTitleList } from "@/entities/gathering";
import { TopTitleList } from "@/shared/ui/topTitleList";

export const TopGatheringTitleList = async () => {
  const topGatheringTitleList = await getTopGatheringTitleList();

  return (
    <TopTitleList
      title="모임"
      href="gathering"
      topTitleList={topGatheringTitleList}
    />
  );
};
