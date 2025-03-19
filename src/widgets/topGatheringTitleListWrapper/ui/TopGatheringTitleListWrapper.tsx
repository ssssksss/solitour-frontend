import { TopTitleListSkeleton } from "@/shared/ui/topTitleList";
import { Suspense } from "react";
import { TopGatheringTitleList } from "./TopGatheringTitleList";

export const TopGatheringTitleListWrapper = () => {
  return (
    <Suspense fallback={<TopTitleListSkeleton title="모임" />}>
      <TopGatheringTitleList />
    </Suspense>
  );
};
