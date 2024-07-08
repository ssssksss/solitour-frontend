import DiaryCardSkeleton from "./DiaryCardSkeleton";

const DiaryListSkeleton = () => {
  return (
    <div className="w-[60rem] max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <h1 className="py-[2.375rem] text-[1.75rem] font-bold">여행 일기</h1>
      <div className="flex flex-row justify-end pb-4">
        <div className="h-[2.625rem] w-[7.6875rem] rounded-full bg-gray-200 text-white hover:scale-105 dark:text-slate-600" />
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {[1, 2, 3, 4].map((value) => (
          <DiaryCardSkeleton key={value} />
        ))}
      </div>
    </div>
  );
};

export default DiaryListSkeleton;
