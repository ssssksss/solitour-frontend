"use client";

import { differenceInDays, format } from "date-fns";
import Link from "next/link";
import SupportSearch from "./SupportSearch";
import { useSupportNoticeList } from "@/hooks/support/notice/useSupportNoticeList";
import { Pagination } from "@/shared/ui/pagination";

const categoryStyles: { [key: string]: string } = {
  이벤트: "text-green-800",
  공지: "text-blue-800",
  점검: "text-yellow-800",
  기타: "text-gray-800",
} as const;

const SupportNoticeList = () => {
  const {
    loading,
    noticeList,
    totalNotices,
    viewedNoticeList,
    currentPage,
    handleNoticeClick,
  } = useSupportNoticeList();

  if (loading) {
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
    </div>;
  }

  return (
    <div>
      <div className="flex w-full flex-col pt-6">
        <div className={"flex h-[2.75rem] items-center justify-between pb-5"}>
          <span className={"font-sm flex gap-x-1 font-bold text-black"}>
            총 {totalNotices}건
          </span>
          <SupportSearch loading={loading} />
        </div>
        <div className={"w-full border-t-[1px] border-t-black"}>
          {noticeList.map((notice, index) => (
            <Link
              href={`/support/notice/${notice.id}`}
              key={notice.id}
              className="border-b-gray3 relative grid h-[4.625rem] w-full grid-cols-[7.3125rem_auto_7.5rem] items-center border-b-2 hover:shadow-sm"
              onClick={() => handleNoticeClick(notice.id)}
            >
              {
                differenceInDays(new Date(), new Date(notice.createdAt)) < 2 &&
                  /* eslint-disable indent */
                  !viewedNoticeList.includes(notice.id) && (
                    <div className="absolute top-2 right-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      New
                    </div>
                  )
                /* eslint-enable indent */
              }
              <div className={"flex pl-[1.25rem] font-bold"}>
                {((currentPage || 1) - 1) * 10 + index + 1}
              </div>
              <div className="grid w-full grid-cols-[3.5rem_auto] items-center gap-x-4 pr-2">
                <div
                  className={`${categoryStyles[notice.categoryName]} shrink-0`}
                >
                  {`[${notice.categoryName}]`}
                </div>
                <div className="block truncate overflow-hidden text-lg font-semibold whitespace-nowrap">
                  {notice.title}
                </div>
              </div>
              <p className="text-gray2 pr-5 text-sm">
                {format(new Date(notice.createdAt), "yyyy.MM.dd")}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalNotices / 10)}
      />
    </div>
  );
};

export default SupportNoticeList;
