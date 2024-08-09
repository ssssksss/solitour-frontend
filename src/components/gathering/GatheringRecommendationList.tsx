import { GatheringRecommend } from "@/types/GatheringDto";
import GatheringItem from "../common/GatheringItem";

const GatheringRecommendationList = ({data}: {data: GatheringRecommend[]}) => {
  // TODO
  return (
    <div className="flex w-full my-[2.875rem] flex-col ">
      <h2 className="text-2xl font-bold text-black">추천 여행 정보</h2>
      <div className="my-6 grid min-[745px]:grid-cols-2 m-auto gap-x-3 gap-y-3">
        {data.map((i, index) => (
          <GatheringItem
            key={i.gatheringId}
            {...i}
          />
        ))}
      </div>
    </div>
  );
};

export default GatheringRecommendationList;
