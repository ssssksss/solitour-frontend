import SupportQnADetailEditContainer from "@/containers/support/qna/SupportQnADetailEditContainer";
import { QnADetailType } from "@/types/QnADto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { cookies } from "next/headers";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Props) {
  const qnaId = Number(id);
  if (qnaId <= 0 || !Number.isSafeInteger(qnaId)) {
    throw Error("Not Found");
  }

  return {
    title: `공지사항 조회`,
    description: "공지사항 상세조회",
  };
}

async function fetchData(id: number) {
  const cookie = cookies().get("access_token");

  const res = await fetchWithAuth(`${process.env.BACKEND_URL}/api/qna/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });

  console.log("page.tsx 파일 : ",res.status);
  console.log("page.tsx 파일 : ",cookie);

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  return res.json();
}

export default async function Page({ params: { id } }: Props) {
  const qnaId = Number(id);
  if (qnaId <= 0 || !Number.isSafeInteger(qnaId)) {
    throw Error("Not Found");
  }

  const data: QnADetailType = await fetchData(qnaId);

  return (
    <main className="mb-8 w-full">
      <SupportQnADetailEditContainer data={data} />
    </main>
  );
}
