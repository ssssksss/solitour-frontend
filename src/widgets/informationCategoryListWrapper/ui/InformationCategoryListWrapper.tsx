import { Suspense } from "react";
import { InformationCategoryList } from "./InformationCategoryList";
import { InformationCategoryListSkeleton } from "./InformationCategoryListSkeleton";

interface InformationCategoryListWrapperProps {
  parentCategoryId: number;
  childCategoryId: number;
}

export const InformationCategoryListWrapper = ({
  parentCategoryId,
  childCategoryId,
}: InformationCategoryListWrapperProps) => {
  return (
    <Suspense fallback={<InformationCategoryListSkeleton />}>
      <InformationCategoryList
        parentCategoryId={parentCategoryId}
        childCategoryId={childCategoryId}
      />
    </Suspense>
  );
};
