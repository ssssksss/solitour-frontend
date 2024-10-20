const CommentItemSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-[0.625rem] border-b border-b-gray3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <div className="h-[3.375rem] w-[3.375rem] rounded-full border-[0.03125rem] bg-gray-100" />
          <div className="flex flex-col gap-1">
            <p className="h-4 w-8 bg-gray-100" />
            <p className="h-4 w-20 bg-gray-100" />
          </div>
        </div>
        <div className="mb-[0.5625rem] h-5 w-5 bg-gray-100" />
      </div>
      <div>
        <div className="h-[4.375rem] pl-[4.125rem]">
          <div className="h-5 w-80 bg-gray-100" />
        </div>
        <div className="h-8 w-full">
          <div className="flex flex-row items-center justify-end gap-4 text-xs text-gray1">
            <div className="h-4 w-5 bg-gray-100" />
            <div className="h-4 w-5 bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItemSkeleton;
