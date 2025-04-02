export const DiaryViewerSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-col items-start">
      <div className="flex flex-row items-center gap-14">
        <div className="h-6 w-10.25 bg-gray-100" />
        {[1, 2, 3, 4, 5].map((value) => (
          <div key={value} className="h-6 w-2 bg-gray-100" />
        ))}
      </div>
      <div className="mt-22 h-20 w-16 bg-gray-100" />
      <div className="mt-12 h-10.5 w-49 bg-gray-100" />
      <div className="mt-6 flex w-full flex-row items-center justify-between">
        <div className="h-7 w-22.5 bg-gray-100" />
        <div className="flex flex-row items-center gap-2">
          <div className="h-7 w-5 bg-gray-100" />
          <div className="h-7 w-44 bg-gray-100" />
        </div>
      </div>
      <div className="mt-16 flex w-full flex-col gap-2">
        <div className="h-6 w-72 bg-gray-100" />
        <div className="h-6 max-w-156 bg-gray-100" />
        <div className="my-9.5 aspect-5/2 w-full rounded-2xl bg-gray-100" />
        <div className="h-6 w-full bg-gray-100" />
        <div className="h-6 w-20 bg-gray-100" />
        <div className="my-9.5 flex flex-row items-center gap-5 max-[1024px]:flex-col">
          <div className="h-104.75 w-117.5 rounded-2xl bg-gray-100 max-[518px]:w-full" />
          <div className="h-104.75 w-117.5 rounded-2xl bg-gray-100 max-[518px]:w-full" />
        </div>
        <div className="h-6 max-w-160 bg-gray-100" />
      </div>
      <div className="mt-6 mb-32 flex w-full flex-row items-center justify-end gap-3 text-sm">
        <div className="flex flex-row items-center gap-1">
          <div className="h-4 w-4 bg-gray-100" />
          <div className="h-4 w-7 bg-gray-100" />
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="h-4 w-4 bg-gray-100" />
          <div className="h-4 w-7 bg-gray-100" />
        </div>
      </div>
    </div>
  );
};
