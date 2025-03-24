export const InformationItemSkeleton = () => {
  return (
    <div className="outline-gray3 hover:outline-main flex h-[19.6875rem] w-full animate-pulse flex-col justify-between rounded-2xl bg-gray-100 outline duration-300 max-[744px]:min-w-[19.183125rem]">
      <div className="flex flex-row items-center justify-between px-5 pt-5">
        <div className="h-8 w-12 rounded-full border bg-gray-200 px-4 py-1.5 shadow-sm" />
        <div className="h-8 w-8 bg-gray-200" />
      </div>
      <div className="flex h-28 flex-col justify-between bg-white px-5 py-4">
        <div className="h-5 w-60 bg-gray-100 p-1" />
        <div className="h-5 w-40 bg-gray-100 p-1" />
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-1">
            <div className="h-4 w-4 bg-gray-100" />
            <div className="h-4 w-20 bg-gray-100" />
          </div>
          <div className="flex flex-row items-center gap-3">
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
      </div>
    </div>
  );
};
