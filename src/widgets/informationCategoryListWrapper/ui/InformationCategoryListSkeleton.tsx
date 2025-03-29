export const InformationCategoryListSkeleton = () => {
  return (
    <div className="mt-6 flex w-full animate-pulse flex-col gap-6">
      <div className="mt-22 flex w-full flex-row items-center justify-between border-b pb-2">
        <div className="flex flex-row items-center gap-9">
          {[1, 2, 3].map((value) => (
            <div key={value} className="h-7 w-8 bg-gray-100" />
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between max-[1024px]:flex-col-reverse max-[1024px]:items-start max-[1024px]:space-y-6 max-[1024px]:space-y-reverse">
        <div className="flex flex-wrap items-center gap-1">
          {[1, 2, 3, 4].map((value) => (
            <div key={value} className="h-9 w-14 rounded-full bg-gray-100" />
          ))}
        </div>
        <div className="flex flex-row items-center gap-4 max-[1024px]:w-full max-[1024px]:justify-between max-[744px]:flex-col max-[744px]:items-start">
          <div className="h-5 max-[1024px]:w-full">
            <div className="h-full w-64 bg-gray-100 max-[1024px]:flex-1 max-[744px]:w-full" />
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="h-5 w-14 bg-gray-100" />
            <div className="h-5 w-14 bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
};
