import { InformationCategoryListWrapper } from "@/widgets/informationCategoryListWrapper";
import { InformationList } from "@/widgets/informationList";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="flex w-full flex-col items-center">
      <InformationCategoryListWrapper />
      <Suspense>
        <InformationList />
      </Suspense>
    </div>
  );
}
