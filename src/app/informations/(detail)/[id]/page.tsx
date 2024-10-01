import Breadcrumbs from "@/components/common/Breadcrumb";
import InformationViewer from "@/components/informations/detail/InformationViewer";
import RecommendationList from "@/components/informations/detail/RecommendationList";
import CommentListContainer from "@/containers/informations/detail/CommentListContainer";
import { InformationDetailDto } from "@/types/InformationDto";
import { cookies } from "next/headers";

async function getInformation(id: number) {
  const cookie = cookies().get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/${id}`,
    {
      method: "GET",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
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
    throw Error("Not Found");
  }

  return {
    title: `정보 - ${informationId}`,
    description: "Solitour의 정보 상세 페이지",
  };
}

export default async function page({ params: { id } }: Props) {
  const informationId = Number(id);
  if (informationId < 1 || !Number.isSafeInteger(informationId)) {
    throw Error("Not Found");
  }

  const data = await getInformation(informationId);

  return (
    <div className="flex w-full flex-col items-center">
      <Breadcrumbs
        categories={[
          {
            label: "정보",
            href: "/informations/list?page=1&parentCategoryId=1",
          },
          { label: "정보 상세", href: "" },
        ]}
      />
      <InformationViewer informationId={informationId} data={data} />
      {/* <CommentListContainer informationId={informationId} /> */}
      <RecommendationList data={data} />
    </div>
  );
}
