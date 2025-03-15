import { Suspense } from "react";
import { InformationListSkeleton } from "./InformationListSkeleton";
import { InformationList } from "./InformationList";

interface InformationListWrapperProps {
  page: number;
  parentCategoryId: number;
  childCategoryId: number;
  place?: string;
  order?: string;
  tagName?: string;
  search?: string;
}

export const InformationListWrapper = ({
  page,
  parentCategoryId,
  childCategoryId,
  place,
  order,
  tagName,
  search,
}: InformationListWrapperProps) => {
  return (
    <Suspense fallback={<InformationListSkeleton />}>
      <InformationList
        page={page}
        parentCategoryId={parentCategoryId}
        childCategoryId={childCategoryId}
        place={place}
        order={order}
        tagName={tagName}
        search={search}
      />
    </Suspense>
  );
};
