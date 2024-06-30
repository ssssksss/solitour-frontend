import Link from "next/link";

type MyProps = {
  title: "여행" | "모임";
};

const titleList: { [key: string]: string[] } = {
  여행: [
    "서촌 분위기 있는 혼술 카페 여기 있어! 서촌 분위기 있는 혼술 카페 여기 있어!",
    "커피와 프렌치토스트가 맛있는 재즈 카페 시노라 북촌점",
    "다양한 프로그램이 있는 제주 월정리 게하",
    "서촌 분위기 있는 혼술 카페 여기 있어!",
    "서촌 분위기 있는 혼술 카페 여기 있어!",
  ],
  모임: [
    "동해 서핑 투게더",
    "강릉 빵지순례 같이 해요!",
    "전시회 좋아하는 사람? 국립현대미술관 같이 가요",
    "퇴근 후 운동할 사람? 인왕산 같이 올라가요!  ",
    "떡볶이 맛잘알과 함께 전국 떡볶이 투어",
  ],
};

const TopList = async ({ title }: MyProps) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="z-10 -mt-28 flex h-fit w-[60rem] flex-col justify-center rounded-2xl bg-white px-24 py-16 shadow shadow-[#CCECE2] max-[1024px]:w-[39.75rem] max-[1024px]:px-8 max-[1024px]:py-12 max-[744px]:-mt-24 max-[744px]:w-[calc(100%_-_48px)] dark:bg-slate-800">
      <h2 className="mb-9 border-b-2 border-gray3 pb-3 text-2xl font-semibold text-black dark:border-slate-200 dark:text-slate-200">
        {`${title} 정보 `}
        <span className="font-bold text-main">Top 5</span>
      </h2>
      <div className="w-full max-[1024px]:space-x-0">
        <ol className="grid grid-cols-2 gap-x-4 gap-y-[1.5rem] max-[1024px]:flex max-[1024px]:flex-col">
          {titleList[title].map((title: string, index: number) => (
            <li
              key={index}
              className={`flex items-center ${index > 2 ? `col-start-2` : `col-start-1`}`}
              style={{ gridRowStart: index > 2 ? index - 2 : index + 1 }}
            >
              <p className="w-6 font-bold text-main">{index + 1}.</p>
              <Link
                className="w-96 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-gray1 hover:text-main max-[1024px]:w-full dark:text-slate-400"
                href="/"
              >
                {title}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TopList;
