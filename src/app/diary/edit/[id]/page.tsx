import { getDiary } from "@/entities/diary";
import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { DiaryUpdateEditor } from "@/widgets/diaryUpdateEditor";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const diaryId = Number((await params).id);
  if (diaryId <= 0 || !Number.isSafeInteger(diaryId)) {
    throw new Error("Not Found");
  }

  return {
    title: `일기 수정하기 - ${diaryId}`,
    description: "Solitour의 여행 일기 수정 페이지",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const diaryId = Number((await params).id);
  if (diaryId <= 0 || !Number.isSafeInteger(diaryId)) {
    throw new Error("Not Found");
  }

  const diary = (await getDiary(diaryId)).diaryContentResponse;

  return (
    <div className="flex w-full flex-col items-center">
      <Breadcrumb
        categories={[
          { label: "여행 일기", href: "/diary/list?page=1" },
          { label: "일기 수정하기", href: "" },
        ]}
      />
      <DiaryUpdateEditor diary={diary} />
    </div>
  );
}
