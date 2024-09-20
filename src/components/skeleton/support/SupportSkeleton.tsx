const SupportSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-4 flex w-full flex-col items-start py-1">
        <div
          className={"flex w-full flex-col items-start gap-y-4 pt-[2.375rem]"}
        >
          <h1
            className={"w-full text-start text-[1.75rem] font-bold text-black"}
          >
            고객지원
          </h1>
          <p className={"text-gray1"}> 솔리투어 고객지원에서 도와드릴게요 </p>
        </div>
        <article className="flex max-w-full justify-start gap-1 overflow-x-scroll pt-12 scrollbar-hide">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-[3.25rem] w-28 rounded-full bg-gray-100"
            />
          ))}
        </article>
      </div>
      <div className="flex w-full flex-col">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mb-6 rounded-lg p-6 shadow-md">
            <div className="mb-4 h-8 w-20 bg-gray-100" />
            <div className="h-6 w-full bg-gray-100" />
            <div className="h-6 w-full bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportSkeleton;
