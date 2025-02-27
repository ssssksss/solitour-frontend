import Breadcrumbs from "@/components/common/Breadcrumb";
import DiaryViewer from "@/components/diary/detail/DiaryViewer";
import { GetDiaryResponseDto } from "@/types/DiaryDto";
import { cookies } from "next/headers";

async function getDiary(id: number) {
  const cookie = (await cookies()).get("access_token");
  const response = await fetch(`${process.env.BACKEND_URL}/api/diary/${id}`, {
    method: "GET",
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
    next: { revalidate: 60, tags: [`getDiary/${id}`] },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<GetDiaryResponseDto>;
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;

  const { id } = params;

  const diaryId = Number(id);
  if (diaryId <= 0 || !Number.isSafeInteger(diaryId)) {
    throw Error("Not Found");
  }

  return {
    title: `여행 일기 - ${diaryId}`,
    description: "Solitour의 여행 일기 상세 페이지",
  };
}

export default async function page(props: Props) {
  const params = await props.params;
  const { id } = params;
  const diaryId = Number(id);
  if (diaryId <= 0 || !Number.isSafeInteger(diaryId)) {
    throw Error("Not Found");
  }

  const data = await getDiary(diaryId);

  return (
    <div className="flex w-full flex-col items-center">
      <Breadcrumbs
        categories={[
          { label: "여행 일기", href: "/diary/list?page=1" },
          { label: "일기 상세", href: "" },
        ]}
      />
      <DiaryViewer data={data} />
    </div>
  );
}
