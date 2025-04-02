import { DiaryCardSkeleton } from "@/entities/diary";
import { PaginationSkeleton } from "@/shared/ui/pagination";

export const DiaryListSkeleton = () => {
  return (
    <div className="w-full">
      <h1 className="py-9.5 text-3xl font-bold">여행 일기</h1>
      <div className="flex flex-row justify-end pb-4">
        <div className="h-10.5 w-31 rounded-full bg-gray-200 text-white hover:scale-105" />
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
