export const SupportNoticeListSkeleton = () => {
  return (
    <div className="flex w-full flex-col space-y-4 pb-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse flex-col gap-y-2 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-xs"
        >
          <div className="mb-2 h-4 w-24 rounded-lg bg-gray-300"></div>
          <div className="mb-2 h-6 w-48 rounded-lg bg-gray-300"></div>
          <div className="h-4 w-32 rounded-lg bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
};
