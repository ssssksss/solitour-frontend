import Link from "next/link";

interface TopTitleListProps {
  title: string;
  href: string;
  topTitleList: { id: number; title: string }[];
}

export const TopTitleList = ({
  title,
  href,
  topTitleList,
}: TopTitleListProps) => {
  return (
    <div className="relative flex h-fit w-full flex-col justify-center rounded-2xl shadow shadow-[#CCECE2]">
      <div className="h-[20rem] w-full max-[1024px]:h-[24rem]">
        <div className="h-full w-full rounded-2xl bg-white px-24 py-16 max-[1024px]:px-8 max-[1024px]:py-12">
          <h2 className="border-gray3 mb-9 border-b-[0.0625rem] pb-3 text-2xl font-semibold text-black">
            {`${title} 정보 `}
            <span className="text-main font-bold">Top 5</span>
          </h2>
          <div className="w-full">
            <ol className="grid grid-cols-2 gap-x-4 gap-y-6 max-lg:flex max-lg:flex-col">
              {topTitleList.map((value, index) => (
                <li
                  key={index}
                  className={`flex items-center ${index > 2 ? "col-start-2" : "col-start-1"}`}
                  style={{ gridRowStart: index > 2 ? index - 2 : index + 1 }}
                >
                  <p className="text-main w-6 font-bold">{index + 1}.</p>
                  <Link
                    className="text-gray1 hover:text-main w-96 truncate text-sm font-medium max-[1024px]:w-full"
                    href={`/${href}/${value.id}`}
                  >
                    {value.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
