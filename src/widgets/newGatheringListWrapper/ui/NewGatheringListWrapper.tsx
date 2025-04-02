import { Suspense } from "react";
import { NewGatheringList } from "./NewGatheringList";
import { ListWrapper } from "@/shared/ui/listWrapper";
import { NewGatheringListSkeleton } from "./NewGatheringListSkeleton";
import { getNewGatheringList } from "@/entities/gathering";

export const NewGatheringListWrapper = () => {
  const newGatheringListPromise = getNewGatheringList();

  return (
    <ListWrapper
      titles={["새로움을 발견할,", "NEW", "모임"]}
      description={"솔리투어에서 새로운 사람들과 최신 모임을 찾아보세요!"}
      href="/gathering"
    >
      <Suspense fallback={<NewGatheringListSkeleton />}>
        <NewGatheringList newGatheringListPromise={newGatheringListPromise} />
      </Suspense>
    </ListWrapper>
  );
};
