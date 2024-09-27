import { NoticeType } from "@/types/NoticeDto";
import { differenceInDays, format } from "date-fns";
import Link from "next/link";
import SupportSearch from "./SupportSearch";

interface ISupportNoticeList {
  data: NoticeType[];
  viewedNotices: number[];
  onClickNotice: (id: number) => void;
  loading: boolean;
  totalElements: number;
  currentPage: number;
}

const categoryStyles: { [key: string]: string } = {
  이벤트: "text-green-800",
  공지: "text-blue-800",
  점검: "text-yellow-800",
  기타: "text-gray-800",
};

const SupportNoticeList = ({
  data,
  viewedNotices,
  onClickNotice,
  loading,
  totalElements,
  currentPage,
}: ISupportNoticeList) => {
  return (
    <div className="flex w-full flex-col pt-6">
      <div className={"flex h-[2.75rem] items-center justify-between pb-5"}>
        <span className={"font-sm flex gap-x-1 font-bold text-black"}>
          총 {totalElements}건
        </span>
        <SupportSearch loading={loading} />
      </div>
      <div className={"w-full border-t-[1px] border-t-black"}>
        {data.map((notice, index) => (
          <Link
            href={`/support/notice/${notice.id}`}
            key={notice.id}
            className="relative grid h-[4.625rem] w-full grid-cols-[7.3125rem_auto_7.5rem] items-center border-b-2 border-b-gray3 hover:shadow"
            onClick={() => onClickNotice(notice.id)}
          >
            {
              differenceInDays(new Date(), new Date(notice.createdAt)) < 2 &&
                /* eslint-disable indent */
                !viewedNotices.includes(notice.id) && (
                  <div className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
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
                className={`${categoryStyles[notice.categoryName]} flex-shrink-0`}
              >
                {`[${notice.categoryName}]`}
              </div>
              <div className="block overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                {notice.title}
              </div>
            </div>
            <p className="pr-5 text-sm text-gray2">
              {format(new Date(notice.createdAt), "yyyy.MM.dd")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SupportNoticeList;
