"use client";

import { Pagination } from "@/shared/ui/pagination";
import { useMyPageInformationList } from "../model/useMyPageInformationList";
import { INFORMATION_CATEGORY_LIST } from "../config/informationCategoryList";
import { MyPageCategoryList } from "./MyPageCategoryList";
import {
  InformationItem,
  InformationItemSkeleton,
} from "@/entities/information";
import { InformationBookmark } from "@/features/informationBookmark";

export const MyPageInformationList = () => {
  const {
    category,
    currentPage,
    elements,
    totalElements,
    loading,
    handleCategoryClick,
  } = useMyPageInformationList();

  return (
    <div className="w-full">
      <MyPageCategoryList
        categoryList={INFORMATION_CATEGORY_LIST}
        activeCategory={category}
        onClick={handleCategoryClick}
      />
      <div className="flex w-full flex-col">
        <div className="mt-6 grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
          {
            loading
              ? /* eslint-disable indent */
                Array.from({ length: 6 }).map((_, index) => (
                  <InformationItemSkeleton key={index} />
                ))
              : elements.map((value) => (
                  <InformationItem
                    key={value.informationId}
                    informationId={value.informationId}
                    categoryName={value.categoryName}
                    isLike={false}
                    title={value.title}
                    image={value.thumbNailImage}
                    address={
                      value.zoneCategoryParentName +
                      ", " +
                      value.zoneCategoryChildName
                    }
                    likeCount={value.likeCount}
                    viewCount={value.viewCount}
                  >
                    <InformationBookmark
                      informationId={value.informationId}
                      initialIsBookmarked={value.isBookMark}
                    />
                  </InformationItem>
                ))
            /* eslint-enable indent */
          }
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalElements / 6)}
      />
    </div>
  );
};
