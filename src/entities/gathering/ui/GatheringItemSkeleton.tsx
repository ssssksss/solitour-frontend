export const GatheringItemSkeleton = () => {
  return (
    <div className="outline-gray3 flex w-full animate-pulse flex-col gap-5 rounded-2xl p-6 outline-2 -outline-offset-2 max-[744px]:min-w-[19.183125rem]">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <div className="h-6 w-24 rounded-full bg-gray-300" />
          <div className="h-7 w-7 rounded-full bg-gray-300" />
        </div>
        <div className="mt-6 h-5 w-3/4 rounded-sm bg-gray-300" />
        <div className="mt-3 h-5 w-1/2 rounded-sm bg-gray-300" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid gap-5 text-sm font-semibold max-[744px]:grid-cols-[auto_6.25rem] max-[432px]:grid-cols-1 min-[745px]:grid-cols-1 min-[1024px]:grid-cols-2">
          <div className="flex flex-row items-center gap-2">
            <div className="h-5 w-5 rounded-sm bg-gray-300" />
            <div className="h-5 w-1/2 rounded-sm bg-gray-300" />
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 text-black">
          <div className="h-5 w-5 rounded-sm bg-gray-300" />
          <div className="h-5 w-1/2 rounded-sm bg-gray-300" />
        </div>
        <div className="flex flex-row items-center gap-2 text-black">
          <div className="h-5 w-5 rounded-sm bg-gray-300" />
          <div className="h-5 w-1/2 rounded-sm bg-gray-300" />
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-5 w-5 rounded-sm bg-gray-300" />
          <div className="h-5 w-1/2 rounded-sm bg-gray-300" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <div className="h-5 w-5 rounded-sm bg-gray-300" />
          <div className="h-5 w-1/2 rounded-sm bg-gray-300" />
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-gray-300" />
          <div className="h-6 w-6 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
};
