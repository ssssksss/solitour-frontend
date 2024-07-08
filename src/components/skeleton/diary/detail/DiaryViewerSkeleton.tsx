const DiaryViewerSkeleton = () => {
  return (
    <div className="flex w-[60rem] animate-pulse flex-col items-start max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <div className="flex flex-row items-center gap-14">
        <div className="h-6 w-[2.5625rem] bg-gray-100" />
        {[1, 2, 3, 4, 5, 6, 7].map((value) => (
          <div key={value} className="h-6 w-2 bg-gray-100" />
        ))}
      </div>
      <div className="mt-[5.5rem] h-20 w-16 bg-gray-100" />
      <div className="mt-12 h-[2.625rem] w-[12.25rem] bg-gray-100" />
      <div className="mt-6 flex w-full flex-row items-center justify-between">
        <div className="h-7 w-[5.625rem] bg-gray-100" />
        <div className="flex flex-row items-center gap-2">
          <div className="h-7 w-5 bg-gray-100" />
          <div className="h-7 w-44 bg-gray-100" />
        </div>
      </div>
      <div className="mt-6 flex w-full flex-row items-center justify-end gap-3 text-sm">
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
