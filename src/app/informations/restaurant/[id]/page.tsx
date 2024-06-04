import InformationViewer from "@/components/informations/InformationViewer";
import PagePath from "@/components/informations/PagePath";

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
    title: `정보 - 맛집 - ${postId}`,
    description: "Solitour의 맛집 정보글 조회 페이지",
  };
}

export default function page({ params: { id } }: MyProps) {
  const postId = Number(id);
  if (postId < 1 || !Number.isSafeInteger(postId)) {
    throw Error("Not Found");
  }

  return (
    <div className="flex flex-col items-center">
      <PagePath category="맛집" />
      <InformationViewer category="맛집" id={postId} />
    </div>
  );
}