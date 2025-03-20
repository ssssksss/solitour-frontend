import { Breadcrumbs } from "@/shared/ui/breadcrumb";
import { InformationViewerWrapper } from "@/widgets/informationViewerWrapper";

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
      <InformationViewerWrapper informationId={informationId} />
    </div>
  );
}
