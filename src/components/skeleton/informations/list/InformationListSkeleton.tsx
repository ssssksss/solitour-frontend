import InformationItemSkeleton from "../../common/InformationItemSkeleton";
import PaginationSkeleton from "../../common/PaginationSkeleton";

const InformationListSkeleton = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
          <InformationItemSkeleton key={value} />
        ))}
      </div>
      <PaginationSkeleton />
    </div>
  );
};

export default InformationListSkeleton;
