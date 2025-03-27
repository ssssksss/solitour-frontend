import { GatheringExcludeToggle } from "@/features/gatheringExcludeToggle";
import { GatheringFilter } from "@/features/gatheringFilter";
import { GatheringSearch } from "@/features/gatheringSearch";
import { GatheringSort } from "@/features/gatheringSort";
import { GatheringBanner } from "@/widgets/gatheringBanner";
import { GatheringCategoryListWrapper } from "@/widgets/gatheringCategoryListWrapper";
import { GatheringList } from "@/widgets/gatheringList";
import { TopGatheringTitleListWrapper } from "@/widgets/topGatheringTitleListWrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "모임",
  description: "Solitour의 모임(탭)",
};

export default async function Page() {
  return (
    <Suspense>
      <div className="flex min-h-[calc(100vh-25rem)] w-full flex-col pb-10">
        <div className="flex w-full flex-col items-center">
          <GatheringBanner />
          <div className="mt-[26.25rem] max-[744px]:mt-[31rem]" />
        </div>
        <div className="flex w-full flex-col items-center">
          <TopGatheringTitleListWrapper />
        </div>
        <div className="flex w-full min-w-[19.1875rem] flex-col pt-22">
          <article className="flex flex-col gap-y-4 min-[960px]:flex-row-reverse min-[960px]:gap-x-6">
            <div className="flex w-full flex-row justify-between gap-x-2 gap-y-5 max-[744px]:flex-col min-[960px]:gap-x-6">
              <GatheringSearch />
              <div className="text-gray1 flex flex-row items-center justify-between gap-4 text-sm font-medium max-[744px]:w-full">
                <div className="z-10 flex w-30 justify-between gap-4">
                  <GatheringFilter />
                  <GatheringSort />
                </div>
                <div className="min-[745px]:hidden">
                  <GatheringExcludeToggle />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <GatheringCategoryListWrapper />
              <div className="flex min-w-max max-[744px]:hidden">
                <GatheringExcludeToggle />
              </div>
            </div>
          </article>
          <GatheringList />
        </div>
      </div>
    </Suspense>
  );
}
