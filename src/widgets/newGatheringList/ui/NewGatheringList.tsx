import GatheringItemHome from "@/components/common/GatheringItemHome";
import { getNewGatheringList } from "@/entities/gathering";
import { ListWrapper } from "@/shared/ui/listWrapper";
import { LottieNotFound } from "@/shared/ui/lottie";
import { Suspense } from "react";
import { NewGatheringListSkeleton } from "./NewGatheringListSkeleton";

export const NewGatheringList = async () => {
  const newGatheringList = await getNewGatheringList();

  if (newGatheringList.length === 0) {
    return (
      <div className="flex w-full flex-col items-center pb-12">
        <LottieNotFound text="모임을 작성해 보세요." />
      </div>
    );
  }

  return (
    <ListWrapper
      titles={["새로움을 발견할,", "NEW", "모임"]}
      description={"솔리투어에서 새로운 사람들과 최신 모임을 찾아보세요!"}
      href="/gathering"
    >
      <Suspense fallback={<NewGatheringListSkeleton />}>
        <div className="mt-6 grid w-full grid-cols-3 items-center gap-4 p-1 max-[1024px]:grid-cols-2 max-[744px]:flex max-[744px]:w-fit">
          {newGatheringList.map((data) => (
            <GatheringItemHome key={data.gatheringId} data={data} />
          ))}
        </div>
      </Suspense>
    </ListWrapper>
  );
};
