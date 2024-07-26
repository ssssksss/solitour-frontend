const GatheringItemSkeleton = () => {
  return (
    <div className="flex h-[19rem] w-[19rem] animate-pulse flex-col justify-between rounded-2xl p-5 outline outline-2 outline-gray3 duration-300 hover:bg-[#F2FAF7] hover:outline-main dark:bg-slate-800">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <div className="h-8 w-12 rounded-full border-[0.0625rem] bg-gray-100 px-4 py-[0.375rem] text-xs font-semibold shadow dark:bg-slate-600" />
          <div className="h-8 w-8 bg-gray-100 dark:bg-slate-600" />
        </div>
        <div className="mb-1 mt-6 h-6 w-60 bg-gray-100 dark:bg-slate-600" />
        <div className="h-4 w-12 bg-gray-100 dark:bg-slate-600" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <div className="space-y-[0.375rem] text-sm font-medium">
            <div className="flex flex-row items-center gap-3">
              <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
              <div className="h-4 w-20 bg-gray-100 dark:bg-slate-600" />
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
              <div className="h-4 w-28 bg-gray-100 dark:bg-slate-600" />
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
              <div className="h-4 w-12 bg-gray-100 dark:bg-slate-600" />
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
              <div className="h-4 w-36 bg-gray-100 dark:bg-slate-600" />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-1">
            <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
            <div className="h-4 w-28 bg-gray-100 dark:bg-slate-600" />
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-1 text-gray2">
                <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
                <div className="h-4 w-6 bg-gray-100 dark:bg-slate-600" />
              </div>
              <div className="flex flex-row items-center gap-1 text-gray2">
                <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
                <div className="h-4 w-6 bg-gray-100 dark:bg-slate-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatheringItemSkeleton;
