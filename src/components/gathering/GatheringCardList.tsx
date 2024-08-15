import { GatheringRecommend } from "@/types/GatheringDto";
import GatheringItem from "../common/GatheringItem";

interface IGatheringCardList {
    data: GatheringRecommend[]
}
const GatheringCardList = ({data}: IGatheringCardList) => {
  return (
    <div className="min-h-[20rem]">
                    <div className="my-6 grid min-[745px]:grid-cols-2 m-auto gap-x-3 gap-y-3">
        {data?.map((i, index) => (
          <GatheringItem
            key={i.gatheringId}
            {...i}
          />
        ))}
      </div>
    </div>
  );
};
export default GatheringCardList