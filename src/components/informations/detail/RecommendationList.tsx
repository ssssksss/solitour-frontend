import InformationItem from "@/components/common/InformationItem";
import { LottieNotFound } from "@/shared/ui/lottie";
import { InformationDetailDto } from "@/types/InformationDto";

interface RecommendationListProps {
  data: InformationDetailDto;
}

const RecommendationList = ({ data }: RecommendationListProps) => {
  return (
    <div className="my-20 w-full">
      <h2 className="text-2xl font-bold text-black">추천 정보</h2>
      {data.recommendInformation.length === 0 ? (
        <div className="flex w-full flex-col items-center">
          <LottieNotFound text="추천 정보가 없습니다." />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-3 items-center gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
          {data.recommendInformation.map((value) => (
            <InformationItem
              key={value.informationId}
              informationId={value.informationId}
              categoryName={value.categoryName}
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
      )}
    </div>
  );
};

export default RecommendationList;
