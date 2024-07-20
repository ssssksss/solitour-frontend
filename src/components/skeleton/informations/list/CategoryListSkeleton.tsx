const CategoryListSkeleton = () => {
  return (
    <div className="mt-6 flex w-[60rem] animate-pulse flex-col gap-6 max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <div className="mt-[5.5rem] flex w-[60rem] flex-row items-center justify-between border-b-[0.0625rem] pb-2 max-[1024px]:w-[39.75rem] max-[744px]:w-full dark:border-slate-200">
        <div className="flex flex-row items-center gap-9">
          {[1, 2, 3].map((value) => (
            <div
              key={value}
              className="h-7 w-8 bg-gray-100 dark:bg-slate-600"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between max-[1024px]:flex-col-reverse max-[1024px]:items-start max-[1024px]:space-y-6 max-[1024px]:space-y-reverse">
        <div className="flex flex-wrap items-center gap-1">
          {[1, 2, 3, 4].map((value) => (
            <div
              key={value}
              className="h-9 w-14 rounded-full bg-gray-100 dark:bg-slate-600"
            />
          ))}
        </div>
        <div className="flex flex-row items-center gap-4 max-[1024px]:w-full max-[1024px]:justify-between max-[744px]:flex-col max-[744px]:items-start">
          <div className="h-5 max-[1024px]:w-full">
            <div className="h-full w-64 bg-gray-100 max-[1024px]:flex-1 max-[744px]:w-full dark:bg-slate-600" />
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="h-5 w-14 bg-gray-100 dark:bg-slate-600" />
            <div className="h-5 w-14 bg-gray-100 dark:bg-slate-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryListSkeleton;
