type MyProps = {
  title: "여행" | "모임";
};

const TopListSkeleton = ({ title }: MyProps) => {
  return (
    <div className="z-10 -mt-28 flex h-fit w-[60rem] flex-col justify-center rounded-2xl bg-white px-24 py-16 shadow shadow-[#CCECE2] max-[1024px]:w-[39.75rem] max-[1024px]:px-8 max-[1024px]:py-12 max-[744px]:-mt-24 max-[744px]:w-[calc(100%_-_48px)]">
      <h2 className="mb-9 border-b-2 border-gray3 pb-3 text-2xl font-semibold text-black">
        {`${title} 정보 `}
        <span className="font-bold text-main">Top 5</span>
      </h2>
      <div className="w-full max-[1024px]:space-x-0">
        <ol className="grid grid-cols-2 gap-x-4 gap-y-[1.5rem] max-[1024px]:flex max-[1024px]:flex-col">
          {[1, 2, 3, 4, 5].map((value, index) => (
            <li
              key={value}
              className={`flex items-center gap-2 ${index > 2 ? `col-start-2` : `col-start-1`}`}
              style={{ gridRowStart: index > 2 ? index - 2 : index + 1 }}
            >
              <div className="h-6 w-4 animate-pulse bg-gray-100" />
              <div className="h-6 w-80 animate-pulse bg-gray-100" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TopListSkeleton;
