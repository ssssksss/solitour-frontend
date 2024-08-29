import GatheringItem from "../common/GatheringItem";
import GatheringItemSkeleton from "../skeleton/common/GatheringItemSkeleton";

interface Gathering {
  gatheringId: number;
  title: string;
  zoneCategoryParentName: string;
  zoneCategoryChildName: string;
  viewCount: number;
  isBookMark: boolean;
  likeCount: number;
  gatheringCategoryName: string;
  userName: string;
  scheduleStartDate: string; 
  scheduleEndDate: string; 
  deadline: string; 
  allowedSex: "ALL" | "MALE" | "FEMALE"; 
  startAge: number;
  endAge: number;
  personCount: number;
  nowPersonCount: number;
  isLike: boolean;
}

interface IMyPageGatheringList {
  elements: Gathering[];
  onBookMarkClick: (id: number) => void;
  isLoading: boolean;
}

const MyPageGatheringList = ({
  elements,
  onBookMarkClick,
  isLoading,
}: IMyPageGatheringList) => {

  return (
    <div className="my-6 grid min-h-[20rem] w-full justify-items-center gap-x-3 gap-y-3 min-[745px]:grid-cols-2">
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <GatheringItemSkeleton key={index} />
          ))
        : elements.map((item) => (
            <GatheringItem
              key={item.gatheringId}
              data={item}
              onBookMarkClick={() => onBookMarkClick(item.gatheringId)}
            />
          ))}
    </div>
  );
};

export default MyPageGatheringList;
