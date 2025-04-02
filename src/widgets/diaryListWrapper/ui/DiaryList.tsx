import Link from "next/link";
import { DiaryCard, getDiaryList } from "@/entities/diary";
import { DiaryWriteLink } from "./DiaryWriteLink";
import { Pagination } from "@/shared/ui/pagination";

interface DiaryListProps {
  page: number;
}

export const DiaryList = async ({ page }: DiaryListProps) => {
  const diaryList = await getDiaryList(page - 1);

  return (
    <div className="w-full">
      <h1 className="py-9.5 text-3xl font-bold">여행 일기</h1>
      <div className="flex flex-row justify-end pb-4">
        <Link
          className="flex h-10.5 w-31 items-center justify-center rounded-full bg-black text-white hover:scale-105"
          href="/diary/write"
        >
          일기 쓰기
        </Link>
      </div>
      <div className="mb-10 grid grid-cols-2 gap-5 max-[744px]:grid-cols-1">
        {diaryList.content.length < 6 && <DiaryWriteLink />}
        {diaryList.content.map((value, index) => (
          <DiaryCard key={index} diary={value} />
        ))}
      </div>
      {diaryList.content.length > 0 && (
        <Pagination currentPage={page} totalPages={diaryList.page.totalPages} />
      )}
    </div>
  );
};
