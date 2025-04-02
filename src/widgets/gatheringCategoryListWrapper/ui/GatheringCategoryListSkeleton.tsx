export const GatheringCategoryListSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-wrap items-center gap-2 text-left">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="h-8 w-16 rounded-xl border-2 border-[#E9EBED] bg-gray-300 px-3 py-1.5 hover:scale-105"
        />
      ))}
    </div>
  );
};
