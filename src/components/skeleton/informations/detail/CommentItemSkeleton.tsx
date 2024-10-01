const CommentItemSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-[0.625rem] border-b border-b-gray3">
      <div className="flex flex-row items-center gap-3">
        <div className="h-[3.375rem] w-[3.375rem] rounded-full border-[0.03125rem] bg-gray-100" />

        <div className="space-y-1">
          <p className="h-4 w-8 bg-gray-100" />
          <p className="h-4 w-20 bg-gray-100" />
        </div>
      </div>
      <div className="pb-10 pl-[4.125rem]">
        <div className="h-5 w-80 bg-gray-100" />
      </div>
    </div>
  );
};

export default CommentItemSkeleton;
