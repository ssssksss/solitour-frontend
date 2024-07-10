import PagePath from "@/components/common/PagePath";
import InformationEditorContainer from "@/containers/informations/edit/InformationEditorContainer";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Props) {
  const informationId = Number(id);
  if (informationId <= 0 || !Number.isSafeInteger(informationId)) {
    throw Error("Not Found");
  }

  return {
    title: `정보 수정하기 - ${informationId}`,
    description: "Solitour의 정보 수정하기 페이지",
  };
}

export default function page({ params: { id } }: Props) {
  const informationId = Number(id);
  if (informationId <= 0 || !Number.isSafeInteger(informationId)) {
    throw Error("Not Found");
  }

  return (
    <div className="flex flex-col items-center">
      <PagePath first="정보" second={"정보 수정하기"} />
      <InformationEditorContainer id={informationId} />
    </div>
  );
}
