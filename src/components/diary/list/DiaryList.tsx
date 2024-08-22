import DiaryCardContainer from "@/containers/diary/list/DiaryCardContainer";
import DiaryWriteButton from "./DiaryWriteButton";
import Link from "next/link";
import { GetDiaryListResponseDto } from "@/types/DiaryDto";
import { cookies } from "next/headers";

// TODO
async function getDiaryList() {
  const cookie = cookies().get("access_token");
  const response = await fetch(`${process.env.BACKEND_URL}/api/diary`, {
    method: "GET",
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
    next: { revalidate: 60, tags: ["getDiaryList"] },
  });

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error(response.statusText);
  }

  return response.json() as Promise<GetDiaryListResponseDto[]>;
}

const DiaryList = async () => {
  // const data = await getDiaryList();
  const data: GetDiaryListResponseDto[] = [];

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
      <div className="mb-[8.625rem] grid grid-cols-2 gap-5 max-[744px]:grid-cols-1">
        <DiaryWriteButton />
        {data.map((value, index) => (
          <DiaryCardContainer key={index} diaryData={value} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
