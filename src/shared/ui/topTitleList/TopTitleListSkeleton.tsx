interface TopTitleListSkeletonProps {
  title: string;
}

export const TopTitleListSkeleton = ({ title }: TopTitleListSkeletonProps) => {
  return (
    <div className="z-10 -mt-28 flex h-fit w-full flex-col justify-center rounded-2xl bg-white px-24 py-16 shadow-sm shadow-[#CCECE2] max-[1024px]:px-8 max-[1024px]:py-12 max-[744px]:-mt-24">
      <h2 className="border-gray3 mb-9 border-b pb-3 text-2xl font-semibold text-black">
        {`${title} 정보`}
        <span className="text-main font-bold">Top 5</span>
      </h2>
      <div className="w-full max-[1024px]:space-x-0">
        <ol className="grid grid-cols-2 gap-x-4 gap-y-6 max-[1024px]:flex max-[1024px]:flex-col">
          {[1, 2, 3, 4, 5].map((value, index) => (
            <li
              key={value}
              className={[
                index > 2 ? "col-start-2" : "col-start-1",
                "flex items-center gap-2",
              ].join(" ")}
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
