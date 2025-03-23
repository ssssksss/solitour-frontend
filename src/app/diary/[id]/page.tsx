import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { DiaryViewerWrapper } from "@/widgets/diaryViewerWrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const diaryId = Number((await params).id);

  if (diaryId <= 0 || !Number.isSafeInteger(diaryId)) {
    throw Error("Not Found");
  }

  return {
    title: `여행 일기 - ${diaryId}`,
    description: "Solitour의 여행 일기 상세 페이지",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const diaryId = Number((await params).id);

  if (diaryId <= 0 || !Number.isSafeInteger(diaryId)) {
    throw Error("Not Found");
  }

  return (
    <div className="flex w-full flex-col items-center">
      <Breadcrumb
        categoryList={[
          { label: "여행 일기", href: "/diary/list?page=1" },
          { label: "일기 상세", href: "" },
        ]}
      />
      <DiaryViewerWrapper diaryId={diaryId} />
    </div>
  );
}
