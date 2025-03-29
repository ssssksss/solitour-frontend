import { getNotice } from "@/entities/notice";
import { format } from "date-fns";
import { NOTICE_CATEGORY_STYLES } from "../config/noticeCategoryStyles";

interface SupportNoticeViewerProps {
  noticeId: number;
}

const SupportNoticeViewer = async ({ noticeId }: SupportNoticeViewerProps) => {
  const notice = await getNotice(noticeId);

  return (
    <div className="mb-8 flex min-h-[calc(100vh-160px)] w-full flex-col rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div
          className={[
            NOTICE_CATEGORY_STYLES[notice.categoryName],
            "inline-block rounded-full px-4 py-2 text-sm font-semibold",
          ].join(" ")}
        >
          {notice.categoryName}
        </div>
        <div className="text-sm text-gray-600">
          {format(new Date(notice.createdAt), "yyyy-MM-dd")}
        </div>
      </div>
      <div className="mb-4 text-3xl font-extrabold text-gray-900">
        {notice.title}
      </div>
      <hr className="my-4 border-t-2 border-gray-300" />
      <p
        className="py-4 font-medium break-words text-black"
        dangerouslySetInnerHTML={{ __html: notice.content }}
      />
    </div>
  );
};

export default SupportNoticeViewer;
