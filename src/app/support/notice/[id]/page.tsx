import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { SupportNoticeViewerWrapper } from "@/widgets/supportNoticeViewerWrapper";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "공지사항 상세조회",
  description: "공지사항 상세조회 페이지",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const noticeId = Number((await params).id);
  if (noticeId <= 0 || !Number.isSafeInteger(noticeId)) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col">
      <Breadcrumb
        categoryList={[
          { label: "고객지원", href: "/support" },
          { label: "공지사항", href: "/support?menu=notice" },
          { label: noticeId.toString(), href: "" },
        ]}
      />
      <SupportNoticeViewerWrapper noticeId={noticeId} />
    </div>
  );
}
