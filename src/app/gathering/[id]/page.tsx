import RecommendationList from "@/components/gathering/RecommendationList";
import GatheringViewerContainer from "@/containers/gathering/GatheringViewerContainer";

type MyProps = {
  params: { id: string };
};

// TODO
export async function generateMetadata({ params: { id } }: MyProps) {
  const postId = Number(id);
  if (postId <= 0 || !Number.isSafeInteger(postId)) {
    throw Error("Not Found");
  }

  return {
    title: `모임 상세페이지`,
    description: "Solitour의 모임 상세 페이지",
  };
}

export default function page({ params: { id } }: MyProps) {
  const postId = Number(id);
  if (postId < 1 || !Number.isSafeInteger(postId)) {
    throw Error("Not Found");
  }

  return (
    <div
      className={
        "flex w-full flex-col items-center px-[.5rem] pb-[2rem] pt-[2rem] lg:px-[0rem] min-h-[calc(100vh-25rem)] max-w-[60rem] m-auto"
      }>
      <GatheringViewerContainer />
      <RecommendationList />
    </div>
  );
}
