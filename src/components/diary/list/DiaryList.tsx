import DiaryCardContainer from "@/containers/diary/list/DiaryCardContainer";
import DiaryWriteButton from "./DiaryWriteButton";
import Link from "next/link";
import { GetDiaryListResponseDto } from "@/types/DiaryDto";
import { cookies } from "next/headers";
import DiaryPaginationContainer from "@/containers/diary/list/DiaryPaginationContainer";

async function getDiaryList(page: number) {
  const cookie = cookies().get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/diary?page=${page}`,
    {
      method: "GET",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      next: { revalidate: 3600, tags: ["getDiaryList"] },
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
      <h1 className="py-[2.375rem] text-[1.75rem] font-bold dark:text-slate-200">
        여행 일기
      </h1>
      <div className="flex flex-row justify-end pb-4">
        <Link
          className="flex h-[2.625rem] w-[7.6875rem] items-center justify-center rounded-full bg-black text-white hover:scale-105 dark:bg-slate-600"
          href="/diary/write"
        >
          일기 쓰기
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-5 max-[744px]:grid-cols-1">
        {data.diaryContentResponse.length < 6 && <DiaryWriteButton />}
        {data.diaryContentResponse.map((value, index) => (
          <DiaryCardContainer key={index} diaryData={value} />
        ))}
      </div>
      <DiaryPaginationContainer currentPage={page} totalPages={10} />
    </div>
  );
};

export default DiaryList;
