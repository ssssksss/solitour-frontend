const DiaryCardSkeleton = () => {
  return (
    <div className="relative h-[38.9375rem] w-[29.375rem] animate-pulse rounded-2xl border-[0.0625rem] border-gray3 bg-gray-100 hover:border-main dark:bg-slate-800">
      <div className="absolute bottom-9 left-9 flex flex-col items-start gap-4 text-white">
        <div className="h-10 w-44 bg-gray-200 dark:bg-slate-600" />
        <div className="h-6 w-48 bg-gray-200 dark:bg-slate-600" />
      </div>
    </div>
  );
};

export default DiaryCardSkeleton;
