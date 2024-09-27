import SupportQnADetailEditContainer from "@/containers/support/qna/SupportQnADetailEditContainer";
import { QnADetailType } from "@/types/QnADto";
import { fetchWithTokenRefreshSSR } from "@/utils/getNewAccessTokenAndRerequest";
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
    title: "QnA 상세 조회",
    description: "QnA 상세 조회",
  };
}

async function fetchData(id: number) {
  const accessToken = cookies().get("access_token");
  const refreshToken = cookies().get("refresh_token");

  return await fetchWithTokenRefreshSSR<QnADetailType>({
    url: `${process.env.BACKEND_URL}/api/qna/${id}`,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
}

export default async function Page({ params: { id } }: Props) {
  const qnaId = Number(id);
  if (qnaId <= 0 || !Number.isSafeInteger(qnaId)) {
    throw Error("Not Found");
  }

  const data = await fetchData(qnaId);

  return (
    <main className="mb-8 w-full">
      <SupportQnADetailEditContainer data={data} />
    </main>
  );
}
