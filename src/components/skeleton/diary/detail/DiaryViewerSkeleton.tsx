const DiaryViewerSkeleton = () => {
  return (
    <div className="flex w-[60rem] animate-pulse flex-col items-start max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <div className="flex flex-row items-center gap-14">
        <div className="h-6 w-[2.5625rem] bg-gray-100 dark:bg-slate-600" />
        {[1, 2, 3, 4, 5].map((value) => (
          <div key={value} className="h-6 w-2 bg-gray-100 dark:bg-slate-600" />
        ))}
      </div>
      <div className="mt-[5.5rem] h-20 w-16 bg-gray-100 dark:bg-slate-600" />
      <div className="mt-12 h-[2.625rem] w-[12.25rem] bg-gray-100 dark:bg-slate-600" />
      <div className="mt-6 flex w-full flex-row items-center justify-between">
        <div className="h-7 w-[5.625rem] bg-gray-100 dark:bg-slate-600" />
        <div className="flex flex-row items-center gap-2">
          <div className="h-7 w-5 bg-gray-100 dark:bg-slate-600" />
          <div className="h-7 w-44 bg-gray-100 dark:bg-slate-600" />
        </div>
      </div>
      <div className="mt-16 flex w-full flex-col gap-2">
        <div className="h-6 w-72 bg-gray-100 dark:bg-slate-600" />
        <div className="h-6 max-w-[39rem] bg-gray-100 dark:bg-slate-600" />
        <div className="my-[2.375rem] aspect-[5/2] w-full rounded-2xl bg-gray-100 dark:bg-slate-600" />
        <div className="h-6 w-full bg-gray-100 dark:bg-slate-600" />
        <div className="h-6 w-20 bg-gray-100 dark:bg-slate-600" />
        <div className="my-[2.375rem] flex flex-row items-center gap-5 max-[1024px]:flex-col">
          <div className="h-[26.1875rem] w-[29.375rem] rounded-2xl bg-gray-100 max-[518px]:w-full dark:bg-slate-600" />
          <div className="h-[26.1875rem] w-[29.375rem] rounded-2xl bg-gray-100 max-[518px]:w-full dark:bg-slate-600" />
        </div>
        <div className="h-6 max-w-[40rem] bg-gray-100 dark:bg-slate-600" />
      </div>
      <div className="mb-32 mt-6 flex w-full flex-row items-center justify-end gap-3 text-sm">
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
  );
};

export default DiaryViewerSkeleton;
