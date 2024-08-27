import SupportHeaderContainer from "@/containers/support/SupportHeaderContainer";
import { Suspense } from "react";

interface IPage {}

const Page = (props: IPage) => {
  return (
    <div className={"mb-8 w-full"}>
      <Suspense fallback={<div>Loading...</div>}>
        <SupportHeaderContainer />
      </Suspense>
    </div>
  );
};

export default Page;
