import InformationItemSkeleton from "../common/InformationItemSkeleton";

const BestInformationListSkeleton = () => {
  return (
    <div className="mt-6 grid w-full grid-cols-3 items-center gap-4 p-1 max-[1024px]:grid-cols-2 max-[744px]:w-[120.6rem] max-[744px]:grid-cols-6 max-[744px]:grid-rows-1">
      {[1, 2, 3, 4, 5, 6].map((value) => (
        <InformationItemSkeleton key={value} />
      ))}
    </div>
  );
};

export default BestInformationListSkeleton;
