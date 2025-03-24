import { getGathering } from "@/entities/gathering";
import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { GatheringUpdateEditor } from "@/widgets/gatheringUpdateEditor";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const gatheringId = Number((await params).id);
  if (gatheringId <= 0 || !Number.isSafeInteger(gatheringId)) {
    notFound();
  }

  return {
    title: "모임 수정",
    description: "Solitour의 모임 수정 페이지",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const gatheringId = Number((await params).id);
  if (gatheringId <= 0 || !Number.isSafeInteger(gatheringId)) {
    notFound();
  }

  const data = await getGathering(gatheringId);

  return (
    <div className={"min-h-[calc(100vh-25rem)] w-full pt-[2rem] pb-[2rem]"}>
      <Breadcrumb
        categoryList={[
          { label: "모임", href: "/gathering" },
          { label: "모임 수정하기", href: "" },
        ]}
      />
      <GatheringUpdateEditor gatheringDetail={data} />
    </div>
  );
}
