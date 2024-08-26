import SupportHeaderContainer from "@/containers/support/SupportHeaderContainer";

interface IPage {}

const Page = (props: IPage) => {

  return (
    <div className={"w-full mb-8"}>
      <SupportHeaderContainer />
    </div>
  );
};

export default Page;
