import { Suspense } from "react";
import { InformationViewerSkeleton } from "./InformationViewerSkeleton";
import { InformationViewer } from "./InformationViewer";

interface InformationViewerWrapperProps {
  informationId: number;
}

export const InformationViewerWrapper = ({
  informationId,
}: InformationViewerWrapperProps) => {
  return (
    <Suspense fallback={<InformationViewerSkeleton />}>
      <InformationViewer informationId={informationId} />
    </Suspense>
  );
};
