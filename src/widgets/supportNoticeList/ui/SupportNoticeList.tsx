"use client";

import { differenceInDays, format } from "date-fns";
import Link from "next/link";
import { Pagination } from "@/shared/ui/pagination";
import { useSupportNoticeList } from "../model/useSupportNoticeList";
import { NoticeSearch } from "@/features/noticeSearch";
import { CATEGORY_STYLE_LIST } from "../config/categoryStyleList";
import { SupportNoticeListSkeleton } from "./SupportNoticeListSkeleton";

export const SupportNoticeList = () => {
  const {
    loading,
    noticeList,
    totalNotices,
    viewedNoticeList,
    currentPage,
    handleNoticeClick,
  } = useSupportNoticeList();

  if (loading) {
    return <SupportNoticeListSkeleton />;
  }

  return (
    <div>
      <div className="flex w-full flex-col pt-6">
        <div className="flex h-11 items-center justify-between pb-5">
          <span className="font-sm flex gap-x-1 font-bold text-black">
            총 {totalNotices}건
          </span>
          <NoticeSearch loading={loading} />
        </div>
        <div className="w-full border-t border-t-black">
          {noticeList.map((notice, index) => (
            <Link
              key={notice.id}
              className="border-b-gray3 relative grid h-18.5 w-full grid-cols-[7.3125rem_auto_7.5rem] items-center border-b-2 hover:shadow-sm"
              href={`/support/notice/${notice.id}`}
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
              <div className="flex pl-5 font-bold">
                {((currentPage || 1) - 1) * 10 + index + 1}
              </div>
              <div className="grid w-full grid-cols-[3.5rem_auto] items-center gap-x-4 pr-2">
                <div
                  className={[
                    CATEGORY_STYLE_LIST[notice.categoryName],
                    "shrink-0",
                  ].join(" ")}
                >
                  {`[${notice.categoryName}]`}
                </div>
                <div className="block truncate text-lg font-semibold">
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
