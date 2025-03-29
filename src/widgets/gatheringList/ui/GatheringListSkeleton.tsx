import { GatheringItemSkeleton } from "@/entities/gathering";

export const GatheringListSkeleton = () => {
  return (
    <div className="my-6 grid min-h-80 w-full justify-items-center gap-x-3 gap-y-3 min-[744px]:grid-cols-2 min-[1024px]:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <GatheringItemSkeleton key={index} />
      ))}
    </div>
  );
};
