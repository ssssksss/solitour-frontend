import { Gathering } from "@/types/GatheringDto";
import GatheringItem from "../common/GatheringItem";

interface IGatheringCardList {
    data: Gathering[]
}
const GatheringCardList = ({
  data,
}: IGatheringCardList) => {
  return (
    <div className="my-6 grid min-h-[20rem] w-full justify-items-center gap-x-3 gap-y-3 min-[745px]:grid-cols-2">
      {data?.map((i, index) => (
        <GatheringItem
          key={i.gatheringId}
          data={i}
        />
      ))}
    </div>
  );
};
export default GatheringCardList