import { Gathering } from "@/types/GatheringDto";
import GatheringItem from "../common/GatheringItem";

interface IGatheringCardList {
    data: Gathering[]
  onBookMarkClick: (id: number) => void;
}
const GatheringCardList = ({
  data,
  onBookMarkClick,
}: IGatheringCardList) => {
  return (
    <div className="my-6 grid min-h-[20rem] w-full justify-items-center gap-x-3 gap-y-3 min-[745px]:grid-cols-2">
      {data?.map((i, index) => (
        <GatheringItem
          key={i.gatheringId}
          onBookMarkClick={onBookMarkClick}
          data={i}
        />
      ))}
    </div>
  );
};
export default GatheringCardList