import { getGathering } from "@/entities/gathering";
import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { GatheringViewer } from "@/widgets/gatheringViewer";
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
    title: "모임 상세페이지",
    description: "Solitour의 모임 상세 페이지",
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

  const gatheringDetail = await getGathering(gatheringId);

  return (
    <div className="m-auto flex min-h-[calc(100vh-25rem)] w-full max-w-240 flex-col pb-10">
      <Breadcrumb
        categoryList={[
          { label: "모임", href: "/gathering" },
          { label: "모임 상세", href: "" },
        ]}
      />
      <GatheringViewer
        gatheringId={gatheringId}
        gatheringDetail={gatheringDetail}
      />
    </div>
  );
}
