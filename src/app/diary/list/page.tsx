import DiaryList from "@/components/diary/list/DiaryList";
import DiaryListSkeleton from "@/components/skeleton/diary/list/DiaryListSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export const metadata: Metadata = {
  title: "여행 일기",
  description: "Solitour 여행 일기 목록 페이지",
};

export default function page({ searchParams }: Props) {
  const page = Number(searchParams["page"]);
  if (page <= 0 || !Number.isSafeInteger(page)) {
    throw new Error("Invalid Page Number");
  }

  return (
    <div className="flex w-full flex-col items-center">
      <Suspense fallback={<DiaryListSkeleton />}>
        <DiaryList page={page} />
      </Suspense>
    </div>
  );
}
