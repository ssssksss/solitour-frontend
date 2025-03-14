import DiaryViewer from "@/components/diary/detail/DiaryViewer";
import { getDiary } from "@/entities/diary";
import { Breadcrumbs } from "@/shared/ui/breadcrumb";

interface Props {
  params: Promise<{ id: string }>;
}

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

  const diary = (await getDiary(diaryId)).diaryContentResponse;

  return (
    <div className="flex w-full flex-col items-center">
      <Breadcrumbs
        categories={[
          { label: "여행 일기", href: "/diary/list?page=1" },
          { label: "일기 상세", href: "" },
        ]}
      />
      <DiaryViewer data={diary} />
    </div>
  );
}
