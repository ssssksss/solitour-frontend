import { DiaryListWrapper } from "@/widgets/diaryListWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "여행 일기",
  description: "Solitour 여행 일기 목록 페이지",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const page = Number((await searchParams).page);
  if (page <= 0 || !Number.isSafeInteger(page)) {
    throw new Error("Invalid Page Number");
  }

  return (
    <div className="flex w-full flex-col items-center">
      <DiaryListWrapper page={page} />
    </div>
  );
}
