"use client";

import { LottieNotFound } from "@/shared/ui/lottie";
import { Pagination } from "@/shared/ui/pagination";
import { InformationItem } from "@/entities/information";
import { InformationBookmark } from "@/features/informationBookmark";
import { useInformationList } from "../model/useInformationList";
import { InformationListSkeleton } from "./InformationListSkeleton";

export const InformationList = () => {
  const { loading, currentPage, informationList } = useInformationList();

  if (loading) {
    return <InformationListSkeleton />;
  }

  return (
    <div className="flex w-full flex-col">
      {informationList && informationList.content.length > 0 ? (
        <div className="mt-6 flex flex-col">
          <div className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
            {informationList.content.map((value) => (
              <InformationItem
                key={value.informationId}
                informationId={value.informationId}
                categoryName={value.categoryName}
                isLike={value.isLike}
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
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={informationList.page.totalPages}
          />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center pb-12">
          <LottieNotFound text="찾는 내용이 없습니다." />
        </div>
      )}
    </div>
  );
};
