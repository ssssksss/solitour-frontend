import InformationItemSkeleton from "../../../../features/information/ui/InformationItemSkeleton";

const RecommendationListSkeleton = () => {
  return (
    <div className="my-20 w-full">
      <h2 className="text-2xl font-bold text-black">추천 정보</h2>
      <div className="mt-6 grid grid-cols-3 items-center gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
        {[1, 2, 3].map((value) => (
          <InformationItemSkeleton key={value} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationListSkeleton;
