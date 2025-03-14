import { InformationItemSkeleton } from "@/features/information";
import { PaginationSkeleton } from "@/shared/ui/pagination";

const InformationListSkeleton = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="mt-6 grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[744px]:grid-cols-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
          <InformationItemSkeleton key={value} />
        ))}
      </div>
      <PaginationSkeleton />
    </div>
  );
};

export default InformationListSkeleton;
