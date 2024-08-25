import PagePath from "@/components/common/PagePath";
import InformationEditorContainer from "@/containers/informations/edit/InformationEditorContainer";
import { InformationDetailDto } from "@/types/InformationDto";

async function getInformation(id: number) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/${id}`,
    {
      method: "GET",
      next: { revalidate: 60, tags: [`getInformation/${id}`] },
    },
  );

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error(response.statusText);
  }

  return response.json() as Promise<InformationDetailDto>;
}

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Props) {
  const informationId = Number(id);
  if (informationId <= 0 || !Number.isSafeInteger(informationId)) {
    throw new Error("Not Found");
  }

  return {
    title: `정보 수정하기 - ${informationId}`,
    description: "Solitour의 정보 수정하기 페이지",
  };
}

export default async function page({ params: { id } }: Props) {
  const informationId = Number(id);
  if (informationId <= 0 || !Number.isSafeInteger(informationId)) {
    throw Error("Not Found");
  }

  const data = await getInformation(informationId);

  return (
    <div className="flex flex-col items-center">
      <PagePath first="정보" second="정보 수정하기" />
      <InformationEditorContainer informationId={informationId} data={data} />
    </div>
  );
}
