"use client";

import { Gathering, GatheringItem } from "@/entities/gathering";
import { LottieNotFound } from "@/shared/ui/lottie";
import { GatheringBookmark } from "@/features/gatheringBookmark";
import { GatheringLike } from "@/features/gatheringLike";
import { use } from "react";
import { useUserStore } from "@/entities/user";
import { Modal } from "@/shared/ui/modal";
import { AddUserInformationForm } from "@/features/auth";
import { useNewGatheringList } from "../model/useNewGatheringList";

interface NewGatheringListProps {
  newGatheringListPromise: Promise<Gathering[]>;
}

export const NewGatheringList = ({
  newGatheringListPromise,
}: NewGatheringListProps) => {
  const newGatheringList = use(newGatheringListPromise);
  const userStore = useUserStore();
  const { isOpen, closeModal, checkAccessGathering } = useNewGatheringList();

  if (newGatheringList.length === 0) {
    return (
      <div className="flex w-full flex-col items-center pb-12">
        <LottieNotFound text="모임을 작성해 보세요." />
      </div>
    );
  }

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <AddUserInformationForm closeModal={closeModal} />
      </Modal>
      <div
        className="mt-6 grid w-full grid-cols-3 items-center gap-4 p-1 max-[1024px]:grid-cols-2 max-[744px]:flex max-[744px]:w-fit"
        onClick={(e) => checkAccessGathering(e)}
      >
        {newGatheringList.map((gathering) => (
          <GatheringItem
            key={gathering.gatheringId}
            gathering={gathering}
            isAccessGathering={
              !!userStore.sex && !!userStore.age && userStore.id > 0
            }
            gatheringBookmarkComponent={
              <GatheringBookmark
                gatheringId={gathering.gatheringId}
                initialIsBookmarked={gathering.isBookMark}
              />
            }
            gatheringLikeComponent={
              <GatheringLike
                gatheringId={gathering.gatheringId}
                initialLikeCount={gathering.likeCount}
                initialIsLike={gathering.isLike}
              />
            }
          />
        ))}
      </div>
    </div>
  );
};
