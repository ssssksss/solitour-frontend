import DiaryPagination from "@/components/diary/list/DiaryPagination";
import DiaryWriteButton from "@/components/diary/list/DiaryWriteButton";
import { DiaryCard, getDiaryList } from "@/entities/diary";
import Link from "next/link";

interface DiaryListProps {
  page: number;
}

export const DiaryList = async ({ page }: DiaryListProps) => {
  const diaryList = await getDiaryList(page - 1);

  return (
    <div className="w-full">
      <h1 className="py-[2.375rem] text-[1.75rem] font-bold">여행 일기</h1>
      <div className="flex flex-row justify-end pb-4">
        <Link
          className="flex h-[2.625rem] w-[7.6875rem] items-center justify-center rounded-full bg-black text-white hover:scale-105"
          href="/diary/write"
        >
          일기 쓰기
        </Link>
      </div>
      <div className="mb-10 grid grid-cols-2 gap-5 max-[744px]:grid-cols-1">
        {diaryList.content.length < 6 && <DiaryWriteButton />}
        {diaryList.content.map((value, index) => (
          <DiaryCard key={index} diary={value} />
        ))}
      </div>
      {diaryList.content.length > 0 && (
        <DiaryPagination
          currentPage={page}
          totalPages={diaryList.page.totalPages}
        />
      )}
    </div>
  );
};
