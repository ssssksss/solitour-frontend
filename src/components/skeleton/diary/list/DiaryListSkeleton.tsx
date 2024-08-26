import PaginationSkeleton from "../../common/PaginationSkeleton";
import DiaryCardSkeleton from "./DiaryCardSkeleton";

const DiaryListSkeleton = () => {
  return (
    <div className="w-full">
      <h1 className="py-[2.375rem] text-[1.75rem] font-bold">여행 일기</h1>
      <div className="flex flex-row justify-end pb-4">
        <div className="h-[2.625rem] w-[7.6875rem] rounded-full bg-gray-200 text-white hover:scale-105 dark:bg-slate-600" />
      </div>
      <div className="grid grid-cols-2 gap-5 max-[744px]:grid-cols-1">
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <DiaryCardSkeleton key={value} />
        ))}
      </div>
      <PaginationSkeleton />
    </div>
  );
};

export default DiaryListSkeleton;
