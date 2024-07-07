import InformationItemSkeleton from "../../common/InformationItemSkeleton";
import PaginationSkeleton from "../../common/PaginationSkeleton";

const InformationListSkeleton = () => {
  return (
    <div className="flex w-[60rem] flex-col max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
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
