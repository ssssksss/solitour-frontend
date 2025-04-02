import { getInformation } from "@/entities/information";
import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { InformationUpdateEditor } from "@/widgets/informationUpdateEditor";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const informationId = Number((await params).id);
  if (informationId <= 0 || !Number.isSafeInteger(informationId)) {
    notFound();
  }

  return {
    title: `정보 수정하기 - ${informationId}`,
    description: "Solitour의 정보 수정하기 페이지",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const informationId = Number((await params).id);
  if (informationId <= 0 || !Number.isSafeInteger(informationId)) {
    notFound();
  }

  const data = await getInformation(informationId);

  return (
    <div className="flex w-full flex-col items-center">
      <Breadcrumb
        categoryList={[
          {
            label: "정보",
            href: "/informations/list?page=1&parentCategoryId=1",
          },
          { label: "정보 수정하기", href: "" },
        ]}
      />
      <InformationUpdateEditor informationId={informationId} data={data} />
    </div>
  );
}
