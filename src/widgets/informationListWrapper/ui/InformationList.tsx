import { LottieNotFound } from "@/shared/ui/lottie";
import { Pagination } from "@/shared/ui/pagination";
import { getInformationList } from "@/entities/information";
import { InformationItem } from "@/features/informationItem";

interface InformationListProps {
  page: number;
  parentCategoryId: number;
  childCategoryId: number;
  place?: string;
  order?: string;
  tagName?: string;
  search?: string;
}

export const InformationList = async ({
  page,
  parentCategoryId,
  childCategoryId,
  place,
  order,
  tagName,
  search,
}: InformationListProps) => {
  const informationList = await getInformationList(
    page - 1,
    parentCategoryId,
    childCategoryId,
    place,
    order,
    tagName,
    search,
  );

  return (
    <div className="flex w-full flex-col">
      {informationList.content.length > 0 ? (
        <div className="mt-6 flex flex-col">
          <div className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
            {informationList.content.map((value) => (
              <InformationItem
                key={value.informationId}
                informationId={value.informationId}
                categoryName={value.categoryName}
                initialIsBookmarked={value.isBookMark}
                isLike={value.isLike}
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
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={informationList.page.totalPages}
          />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center pb-12">
          <LottieNotFound text="찾는 내용이 없습니다." />
        </div>
      )}
    </div>
  );
};
