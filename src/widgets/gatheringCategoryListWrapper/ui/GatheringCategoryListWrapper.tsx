import { getGatheringCategoryList } from "@/entities/gathering";
import { Suspense } from "react";
import { GatheringCategoryList } from "./GatheringCategoryList";
import { GatheringCategoryListSkeleton } from "./GatheringCategoryListSkeleton";

export const GatheringCategoryListWrapper = () => {
  const gatheringCategoryListPromise = getGatheringCategoryList();

  return (
    <Suspense fallback={<GatheringCategoryListSkeleton />}>
      <GatheringCategoryList
        gatheringCategoryListPromise={gatheringCategoryListPromise}
      />
    </Suspense>
  );
};
