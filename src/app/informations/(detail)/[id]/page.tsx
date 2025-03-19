import InformationViewer from "@/components/informations/detail/InformationViewer";
import RecommendationList from "@/components/informations/detail/RecommendationList";
import { getInformation } from "@/entities/information";
import { Breadcrumbs } from "@/shared/ui/breadcrumb";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const informationId = Number((await params).id);

  if (informationId < 1 || !Number.isSafeInteger(informationId)) {
    throw new Error("Not Found");
  }

  return {
    title: `정보 - ${informationId}`,
    description: "Solitour의 정보 상세 페이지",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const informationId = Number((await params).id);

  if (informationId < 1 || !Number.isSafeInteger(informationId)) {
    throw new Error("Not Found");
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
      <RecommendationList recommendationList={data.recommendInformation} />
    </div>
  );
}
