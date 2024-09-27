import InformationItemContainer from "@/containers/common/InformationItemContainer";
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
  isLoading: boolean;
}

const MyPageInformationList = ({
  elements,
  isLoading,
}: IMyPageInformationList) => {
  return (
    <div className="flex w-full flex-col">
      <div className="mt-6 grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
        {
          isLoading
            ? /* eslint-disable indent */
              Array.from({ length: 6 }).map((_, index) => (
                <InformationItemSkeleton key={index} />
              ))
            : elements.map((value) => (
                <InformationItemContainer
                  key={value.informationId}
                  informationId={value.informationId}
                  categoryName={value.zoneCategoryParentName}
                  isBookMark={value.isBookMark}
                  isLike={false}
                  title={value.title}
                  image={value.thumbNailImage}
                  address={
                    value.zoneCategoryParentName +
                    ", " +
                    value.zoneCategoryChildName
                  }
                  likeCount={value.likeCount}
                  viewCount={value.viewCount}
                />
              ))
          /* eslint-enable indent */
        }
      </div>
    </div>
  );
};

export default MyPageInformationList;
