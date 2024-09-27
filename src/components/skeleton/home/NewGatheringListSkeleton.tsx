import GatheringItemSkeleton from "../common/GatheringItemSkeleton";

const NewGatheringListSkeleton = () => {
  return (
    <div className="mt-6 grid w-full grid-cols-3 items-center gap-4 p-1 max-[1024px]:grid-cols-2 max-[744px]:flex max-[744px]:w-fit">
      {[1, 2, 3, 4, 5, 6].map((value) => (
        <GatheringItemSkeleton key={value} />
      ))}
    </div>
  );
};

export default NewGatheringListSkeleton;
