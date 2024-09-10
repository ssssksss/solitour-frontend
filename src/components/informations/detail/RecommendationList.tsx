import InformationItemContainer from "@/containers/common/InformationItemContainer";
import { InformationDetailDto } from "@/types/InformationDto";

interface Props {
  data: InformationDetailDto;
}

const RecommendationList = ({ data }: Props) => {
  return (
    <div className="my-20 w-full">
      <h2 className="text-2xl font-bold text-black dark:text-slate-200">
        추천 정보
      </h2>
      <div className="mt-6 grid grid-cols-3 items-center gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
        {data.recommendInformation.map((value, index) => (
          <InformationItemContainer
            key={index}
            informationId={index + 1}
            categoryId={0}
            isBookMark={value.isBookMark}
            isLike={value.isLike}
            title={value.title}
            image={value.thumbNailImage}
            address={`${value.zoneCategoryParentName}, ${value.zoneCategoryChildName}`}
            likeCount={value.likeCount}
            viewCount={value.viewCount}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
