import { ListWrapper } from "@/shared/ui/listWrapper";
import { Suspense } from "react";
import { BestInformationListSkeleton } from "./BestInformationListSkeleton";
import { BestInformationList } from "./BestInformationList";

export const BestInformationListWrapper = () => {
  return (
    <ListWrapper
      titles={["고민을 덜어줄,", "BEST", "여행 정보"]}
      description={"솔리투어에서 인기 여행 정보를 확인해보세요!"}
      href="/informations/list?page=1&parentCategoryId=1"
    >
      <Suspense fallback={<BestInformationListSkeleton />}>
        <BestInformationList />
      </Suspense>
    </ListWrapper>
  );
};
