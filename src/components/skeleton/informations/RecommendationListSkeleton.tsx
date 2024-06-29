import InformationItemSkeleton from "../common/InformationItemSkeleton";

const RecommendationListSkeleton = () => {
  return (
    <div className="my-20 w-[60rem] max-[1024px]:w-[39.75rem] max-[744px]:w-[21.5625rem]">
      <h2 className="text-2xl font-bold text-black">추천 여행 정보</h2>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <InformationItemSkeleton key={value} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationListSkeleton;
