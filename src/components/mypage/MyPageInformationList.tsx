import useAuthStore from "@/store/authStore";
import InformationItem from "../common/InformationItem";
import InformationItemSkeleton from "../skeleton/common/InformationItemSkeleton";

interface Information {
  informationId: number;
  title: string;
  zoneCategoryParentName: string;
  zoneCategoryChildName: string;
  viewCount: number;
  isBookMark: boolean;
  thumbNailImage: string;
  likeCount: number;
}

interface IMyPageInformationList {
  elements: Information[];
  onBookMarkClick: (id: number) => void;
  isLoading: boolean;
}

const MyPageInformationList = ({
  elements,
  onBookMarkClick,
  isLoading,
}: IMyPageInformationList) => {
  const authStore = useAuthStore();

  return (
    <div className="flex w-full flex-col">
      <div className="mt-6 grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <InformationItemSkeleton key={index} />
          ))
        : elements.map((item) => (
            <InformationItem
              key={item.informationId}
              informationId={item.informationId}
              categoryId={1}
              isBookMark={item.isBookMark}
              title={item.title}
              image={item.thumbNailImage}
              address={item.zoneCategoryChildName}
              likeCount={item.likeCount}
              viewCount={item.viewCount}
              loading={false}
              userId={authStore.id}
              onBookMarkClick={() => onBookMarkClick(item.informationId)}
            />
          ))}
    </div>
    </div>
  );
};

export default MyPageInformationList;
