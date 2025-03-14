"use client";

import { useMyPageGatheringList } from "@/hooks/mypage/useMyPageGatheringList";
import AddUserInformationForm from "../auth/AddUserInformationForm";
import CategoryList from "../common/CategoryList";
import GatheringItem from "../common/GatheringItem";
import { Modal } from "../common/modal/Modal";
import Pagination from "../../shared/ui/pagination/Pagination";
import GatheringItemSkeleton from "../../features/gathering/ui/GatheringItemSkeleton";

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
    pageHandler,
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
        onClickHandler={handleCategoryClick}
        activeCategory={activeCategory}
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
        pageHandler={pageHandler}
      />
    </div>
  );
};

export default MyPageGatheringList;
