import DiaryWriteButton from "./DiaryWriteButton";
import Link from "next/link";
import { GetDiaryListResponseDto } from "@/types/DiaryDto";
import { cookies } from "next/headers";
import DiaryPagination from "./DiaryPagination";
import DiaryCard from "./DiaryCard";

async function getDiaryList(page: number) {
  const cookie = (await cookies()).get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/diary?page=${page}`,
    {
      method: "GET",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      next: { revalidate: 60, tags: ["getDiaryList"] },
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<GetDiaryListResponseDto>;
}

interface Props {
  page: number;
}

const DiaryList = async ({ page }: Props) => {
  const data = await getDiaryList(page - 1);

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
        {data.content.length < 6 && <DiaryWriteButton />}
        {data.content.map((value, index) => (
          <DiaryCard key={index} diaryData={value} />
        ))}
      </div>
      {data.content.length > 0 && (
        <DiaryPagination currentPage={page} totalPages={data.page.totalPages} />
      )}
    </div>
  );
};

export default DiaryList;
