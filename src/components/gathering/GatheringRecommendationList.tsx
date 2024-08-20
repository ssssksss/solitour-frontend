import { GatheringRecommend } from "@/types/GatheringDto";
import GatheringItem from "../common/GatheringItem";

const GatheringRecommendationList = ({data}: {data: GatheringRecommend[]}) => {
  // TODO
  return (
    <div className="my-[2.875rem] flex w-full flex-col">
      <h2 className="text-2xl font-bold text-black">추천 모임 정보</h2>
      <div className="my-6 grid min-h-[20rem] w-full justify-items-center gap-x-3 gap-y-3 min-[745px]:grid-cols-2">
        {data.map((i, index) => (
          <GatheringItem key={i.gatheringId} {...i} />
        ))}
      </div>
    </div>
  );
};

export default GatheringRecommendationList;
