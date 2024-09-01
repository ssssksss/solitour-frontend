const InformationItemSkeleton = () => {
  return (
    <div className="flex h-[19.6875rem] w-full animate-pulse flex-col justify-between rounded-2xl bg-gray-100 outline outline-1 outline-gray3 duration-300 hover:outline-main dark:bg-slate-600">
      <div className="rounded-0 flex flex-row items-center justify-between px-5 pt-5">
        <div className="h-8 w-12 rounded-full border-[0.0625rem] bg-gray-200 px-4 py-[0.375rem] shadow dark:bg-slate-800" />
        <div className="h-8 w-8 bg-gray-200 dark:bg-slate-800" />
      </div>
      <div className="flex h-28 flex-col justify-between bg-white px-5 py-4 dark:bg-slate-800">
        <div className="h-5 w-60 bg-gray-100 p-1 dark:bg-slate-600" />
        <div className="h-5 w-40 bg-gray-100 p-1 dark:bg-slate-600" />
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-1">
            <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
            <div className="h-4 w-20 bg-gray-100 dark:bg-slate-600" />
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-1">
              <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
              <div className="h-4 w-7 bg-gray-100 dark:bg-slate-600" />
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
              <div className="h-4 w-7 bg-gray-100 dark:bg-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationItemSkeleton;
