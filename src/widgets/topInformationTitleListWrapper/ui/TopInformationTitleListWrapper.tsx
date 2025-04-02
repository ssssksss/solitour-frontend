import { Suspense } from "react";
import { TopInformationTitleList } from "./TopInformationTitleList";
import { TopTitleListSkeleton } from "@/shared/ui/topTitleList";

export const TopInformationTitleListWrapper = () => {
  return (
    <Suspense fallback={<TopTitleListSkeleton title="여행" />}>
      <TopInformationTitleList />
    </Suspense>
  );
};
