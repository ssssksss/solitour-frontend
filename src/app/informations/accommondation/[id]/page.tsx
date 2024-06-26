import RecommendationList from "@/components/informations/RecommendationList";
import InformationViewerContainer from "@/containers/informations/InformationViewerContainer";

type MyProps = {
  params: { id: string };
};

// TODO
export async function generateMetadata({ params: { id } }: MyProps) {
  const postId = Number(id);
  if (postId <= 0 || !Number.isSafeInteger(postId)) {
    throw Error("Not Found");
  }

  //const response = await getPost(postId);
  //const post: Post = await response.json();

  return {
    title: `정보 - 숙박 - ${postId}`,
    description: "Solitour의 숙박 정보글 조회 페이지",
  };
}

export default function page({ params: { id } }: MyProps) {
  const postId = Number(id);
  if (postId < 1 || !Number.isSafeInteger(postId)) {
    throw Error("Not Found");
  }

  return (
    <div className="flex flex-col items-center">
      <InformationViewerContainer category="숙박" id={postId} />
      <RecommendationList />
    </div>
  );
}
