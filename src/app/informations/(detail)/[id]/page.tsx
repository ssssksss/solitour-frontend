import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { InformationViewerWrapper } from "@/widgets/informationViewerWrapper";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const informationId = Number((await params).id);
  if (informationId < 1 || !Number.isSafeInteger(informationId)) {
    notFound();
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
    notFound();
  }

  return (
    <div className="flex w-full flex-col items-center">
      <Breadcrumb
        categoryList={[
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
