import { Suspense } from "react";
import { InformationCategoryList } from "./InformationCategoryList";
import { InformationCategoryListSkeleton } from "./InformationCategoryListSkeleton";
import { getInformationCategoryList } from "@/entities/information";

export const InformationCategoryListWrapper = () => {
  const informationCategoryListPromise = getInformationCategoryList();

  return (
    <Suspense fallback={<InformationCategoryListSkeleton />}>
      <InformationCategoryList
        informationCategoryListPromise={informationCategoryListPromise}
      />
    </Suspense>
  );
};
