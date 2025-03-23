"use client";

import { Pagination } from "@/shared/ui/pagination";
import { AddUserInformationForm } from "@/features/auth";
import { Modal } from "@/shared/ui/modal";
import { GATHERING_CATEGORY_LIST } from "../config/gatheringCategoryList";
import { MyPageCategoryList } from "./MyPageCategoryList";
import { useMyPageGatheringList } from "../model/useMyPageGatheringList";
import { GatheringItem, GatheringItemSkeleton } from "@/entities/gathering";
import { GatheringBookmark } from "@/features/gatheringBookmark";
import { GatheringLike } from "@/features/gatheringLike";

export const MyPageGatheringList = () => {
  const {
    activeCategory,
    currentPage,
    elements,
    totalElements,
    loading,
    isOpen,
    isAccessible,
    handleCategoryClick,
    checkAccessGathering,
    closeModal,
  } = useMyPageGatheringList();

  return (
    <div className="w-full">
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <AddUserInformationForm closeModal={closeModal} />
      </Modal>
      <MyPageCategoryList
        categoryList={GATHERING_CATEGORY_LIST}
        activeCategory={activeCategory}
        onClick={handleCategoryClick}
      />
      <div
        className="my-6 grid w-full justify-items-center gap-x-3 gap-y-3 min-[744px]:grid-cols-2"
        onClick={(e) => checkAccessGathering(e)}
      >
        {
          loading
            ? /* eslint-disable indent */
              Array.from({ length: 6 }).map((_, index) => (
                <GatheringItemSkeleton key={index} />
              ))
            : elements.map((item) => (
                <GatheringItem
                  key={item.gatheringId}
                  gathering={item}
                  isAccessGathering={isAccessible}
                  gatheringBookmarkComponent={
                    <GatheringBookmark
                      gatheringId={item.gatheringId}
                      initialIsBookmarked={item.isBookMark}
                    />
                  }
                  gatheringLikeComponent={
                    <GatheringLike
                      gatheringId={item.gatheringId}
                      initialLikeCount={item.likeCount}
                      initialIsLike={item.isLike}
                    />
                  }
                />
              ))
          /* eslint-enable indent */
        }
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalElements / 6)}
      />
    </div>
  );
};
