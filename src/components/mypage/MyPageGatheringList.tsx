"use client";

import { useMyPageGatheringList } from "@/hooks/mypage/useMyPageGatheringList";
import CategoryList from "../common/CategoryList";
import GatheringItem from "../common/GatheringItem";
import { Modal } from "../../shared/ui/modal/Modal";
import { GatheringItemSkeleton } from "@/features/gathering";
import { Pagination } from "@/shared/ui/pagination";
import { AddUserInformationForm } from "@/features/auth";

const MyPageGatheringList = () => {
  const {
    categories,
    activeCategory,
    currentPage,
    elements,
    totalElements,
    isLoading,
    modalState,
    isAccessible,
    handleCategoryClick,
    checkAccessGathering,
  } = useMyPageGatheringList();

  return (
    <div className="w-full">
      <Modal modalState={modalState}>
        <AddUserInformationForm />
      </Modal>
      <CategoryList
        categories={categories}
        activeCategory={activeCategory}
        onClick={handleCategoryClick}
      />
      <div
        onClick={(e) => checkAccessGathering(e)}
        className="my-6 grid w-full justify-items-center gap-x-3 gap-y-3 min-[744px]:grid-cols-2"
      >
        {
          isLoading
            ? /* eslint-disable indent */
              Array.from({ length: 6 }).map((_, index) => (
                <GatheringItemSkeleton key={index} />
              ))
            : elements.map((item) => (
                <GatheringItem
                  key={item.gatheringId}
                  data={item}
                  isAccessGathering={isAccessible}
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

export default MyPageGatheringList;
