import Link from "next/link";
import MeetingItemSkeleton from "../common/MeetingItemSkeleton";

const NewMeetingListSkeleton = () => {
  return (
    <div className="my-20 w-[60rem] max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <div className="flex flex-row items-center justify-between max-[744px]:justify-center">
        <div className="flex flex-col gap-2 max-[744px]:w-full">
          <div className="flex flex-row items-center justify-between gap-1">
            <h2 className="flex flex-row items-center gap-2 text-2xl font-bold text-black max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-0">
              <p>{"새로움을 발견할,"}</p>
              <p>
                <span className="text-main">NEW</span> 모임
              </p>
            </h2>
            <Link
              className="hidden h-[2.3125rem] w-[5.8125rem] items-center justify-center rounded-full border-[0.0625rem] border-gray3 text-gray1 hover:border-main hover:bg-main hover:text-white max-[744px]:flex"
              href="/meetings"
            >
              전체보기
            </Link>
          </div>
          <p className="text-sm font-medium text-gray1">
            솔리투어에서 새로운 사람들과 최신 모임을 찾아보세요!
          </p>
        </div>
        <Link
          className="flex h-[2.3125rem] w-[5.8125rem] items-center justify-center rounded-full border-[0.0625rem] border-gray3 text-gray1 hover:border-main hover:bg-main hover:text-white max-[744px]:hidden"
          href="/meetings"
        >
          전체보기
        </Link>
      </div>
      <div className="overflow-x-auto">
        <div className="mt-6 flex w-fit flex-wrap items-center justify-center gap-4 p-1 max-[744px]:flex-row max-[744px]:flex-nowrap">
          {[1, 2, 3, 4, 5, 6].map((value) => (
            <MeetingItemSkeleton key={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewMeetingListSkeleton;
