import { getBestInformationList } from "@/entities/information";
import { InformationItem } from "@/features/information";
import { ListWrapper } from "@/shared/ui/listWrapper";
import { LottieNotFound } from "@/shared/ui/lottie";
import { Suspense } from "react";
import { BestInformationListSkeleton } from "./BestInformationListSkeleton";

export const BestInformationList = async () => {
  const bestInformationList = await getBestInformationList();

  if (bestInformationList.length === 0) {
    return (
      <div className="flex w-full flex-col items-center pb-12">
        <LottieNotFound text="여행 정보를 작성해 보세요." />
      </div>
    );
  }

  return (
    <ListWrapper
      titles={["고민을 덜어줄,", "BEST", "여행 정보"]}
      description={"솔리투어에서 인기 여행 정보를 확인해보세요!"}
      href="/informations/list?page=1&parentCategoryId=1"
    >
      <Suspense fallback={<BestInformationListSkeleton />}>
        <div className="mt-6 grid w-full grid-cols-3 items-center gap-4 p-1 max-[1024px]:grid-cols-2 max-[744px]:flex max-[744px]:w-fit">
          {bestInformationList.map((value) => (
            <InformationItem
              key={value.informationId}
              informationId={value.informationId}
              categoryName={value.parentCategoryName}
              initialIsBookMarked={value.isBookMark}
              isLike={value.isLike}
              title={value.title}
              image={value.thumbNailImage}
              address={`${value.zoneCategoryParentName}, ${value.zoneCategoryChildName}`}
              likeCount={value.likeCount}
              viewCount={value.viewCount}
            />
          ))}
        </div>
      </Suspense>
    </ListWrapper>
  );
};
