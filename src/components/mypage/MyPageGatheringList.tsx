import { Gathering } from "@/types/GatheringDto";
import GatheringItem from "../common/GatheringItem";
import GatheringItemSkeleton from "../skeleton/common/GatheringItemSkeleton";
interface IMyPageGatheringList {
  elements: Gathering[];
  isLoading: boolean;
  checkAccessGathering: (e: React.MouseEvent<HTMLDivElement>) => void;
  isAccessGathering: boolean;
}

const MyPageGatheringList = ({
  elements,
  isLoading,
  checkAccessGathering,
  isAccessGathering,
}: IMyPageGatheringList) => {

  return (
    <div
      onClick={(e) => checkAccessGathering(e)}
      className="my-6 grid w-full justify-items-center gap-x-3 gap-y-3 min-[744px]:grid-cols-2"
    >
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <GatheringItemSkeleton key={index} />
          ))
        : elements.map((item) => (
            <GatheringItem
              key={item.gatheringId}
              data={item}
              isAccessGathering={isAccessGathering}
            />
          ))}
    </div>
  );
};

export default MyPageGatheringList;
