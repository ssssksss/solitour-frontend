import { Suspense } from "react";
import SupportNoticeViewer from "./SupportNoticeViewer";

interface SupportNoticeViewerWrapperProps {
  noticeId: number;
}

export const SupportNoticeViewerWrapper = ({
  noticeId,
}: SupportNoticeViewerWrapperProps) => {
  // TODO
  return (
    <Suspense fallback={<div>loading...</div>}>
      <SupportNoticeViewer noticeId={noticeId} />
    </Suspense>
  );
};
