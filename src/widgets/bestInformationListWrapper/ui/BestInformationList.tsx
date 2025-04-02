import {
  getBestInformationList,
  InformationItem,
} from "@/entities/information";
import { InformationBookmark } from "@/features/informationBookmark";
import { LottieNotFound } from "@/shared/ui/lottie";

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
    <div className="mt-6 grid w-full grid-cols-3 items-center gap-4 p-1 max-[1024px]:grid-cols-2 max-[744px]:flex max-[744px]:w-fit">
      {bestInformationList.map((value) => (
        <InformationItem
          key={value.informationId}
          informationId={value.informationId}
          categoryName={value.parentCategoryName}
          isLike={value.isLike}
          title={value.title}
          image={value.thumbNailImage}
          address={`${value.zoneCategoryParentName}, ${value.zoneCategoryChildName}`}
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
  );
};
