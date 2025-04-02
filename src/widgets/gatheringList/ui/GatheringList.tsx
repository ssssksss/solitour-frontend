"use client";

import { Modal } from "@/shared/ui/modal";
import { LottieNotFound } from "@/shared/ui/lottie";
import { Pagination } from "@/shared/ui/pagination";
import { AddUserInformationForm } from "@/features/auth";
import { GatheringListSkeleton } from "./GatheringListSkeleton";
import { useGatheringList } from "../model/useGatheringList";
import { GatheringItem } from "@/entities/gathering";
import { GatheringBookmark } from "@/features/gatheringBookmark";
import { GatheringLike } from "@/features/gatheringLike";

export const GatheringList = () => {
  const {
    loading,
    totalElements,
    elements,
    isOpen,
    currentPage,
    userStore,
    closeModal,
    checkAccessGathering,
  } = useGatheringList();

  if (loading) {
    return <GatheringListSkeleton />;
  }

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <AddUserInformationForm closeModal={closeModal} />
      </Modal>
      {elements.length === 0 ? (
        <div className="flex w-full flex-col items-center">
          <LottieNotFound text="찾는 내용이 없습니다." />
        </div>
      ) : (
        <div
          className="mt-6 grid h-auto w-full justify-items-center gap-5 min-[744px]:grid-cols-2 min-[1024px]:grid-cols-3"
          onClick={(e) => checkAccessGathering(e)}
        >
          {elements.map((gathering) => (
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
      )}
      {elements.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalElements / 12)}
        />
      )}
    </div>
  );
};
