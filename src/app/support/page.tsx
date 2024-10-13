import SupportSkeleton from "@/components/skeleton/support/SupportSkeleton";
import SupportHeaderContainer from "@/containers/support/SupportHeaderContainer";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className={"mb-8 w-full"}>
      <Suspense fallback={<SupportSkeleton />}>
        <SupportHeaderContainer />
      </Suspense>
    </div>
  );
};

export default Page;
