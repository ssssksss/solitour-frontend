const DiaryCardSkeleton = () => {
  return (
    <div className="relative aspect-3/4 w-full animate-pulse rounded-2xl border-[0.0625rem] border-gray3 bg-gray-100 hover:border-main max-[744px]:aspect-auto max-[744px]:h-[29rem]">
      <div className="absolute bottom-9 left-9 flex flex-col items-start gap-4 text-white">
        <div className="h-10 w-44 bg-gray-200" />
        <div className="h-6 w-48 bg-gray-200" />
      </div>
    </div>
  );
};

export default DiaryCardSkeleton;
