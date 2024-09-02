import { NoticeType } from "@/types/NoticeDto";
import { differenceInDays, format } from "date-fns";
import Link from "next/link";

interface ISupportNoticeList {
  data: NoticeType[];
  viewedNotices: number[];
  onClickNotice: (id: number) => void;
}

  const categoryStyles: { [key: string]: string } = {
    이벤트: "bg-green-100 text-green-800",
    공지: "bg-blue-100 text-blue-800",
    점검: "bg-yellow-100 text-yellow-800",
    기타: "bg-gray-100 text-gray-800",
  };


const SupportNoticeList = ({ data, viewedNotices, onClickNotice }: ISupportNoticeList) => {
  return (
    <div className="flex w-full flex-col space-y-4 pb-8">
      {data.map((notice) => (
        <Link
          href={`/support/notice/${notice.id}`}
          key={notice.id}
          className={`relative flex flex-col gap-y-2 rounded-lg border border-gray-200 p-4 shadow-sm hover:bg-main hover:text-white`}
          onClick={() => onClickNotice(notice.id)}
        >
          {differenceInDays(new Date(), new Date(notice.createdAt)) < 2 &&
            !viewedNotices.includes(notice.id) && (
              <div className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                New
              </div>
            )}
          <div
            className={`${categoryStyles[notice.categoryName]} max-w-fit rounded-lg px-2`}
          >
            {notice.categoryName}
          </div>
          <h2 className="mb-2 text-xl font-semibold">{notice.title}</h2>
          <p className="mb-2 text-sm">
            {format(new Date(notice.createdAt), "yyyy-MM-dd")}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SupportNoticeList;
