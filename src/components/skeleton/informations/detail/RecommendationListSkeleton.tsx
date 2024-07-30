import InformationItemSkeleton from "../../common/InformationItemSkeleton";

const RecommendationListSkeleton = () => {
  return (
    <div className="my-20 w-[60rem] max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <h2 className="text-2xl font-bold text-black dark:text-slate-200">
        추천 정보
      </h2>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <InformationItemSkeleton key={value} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationListSkeleton;
