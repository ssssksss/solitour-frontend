import GatheringViewer from "@/components/gathering/read/detail/GatheringViewer";
import GatheringRecommendationList from "@/components/gathering/read/GatheringRecommendationList";
import { Breadcrumbs } from "@/shared/ui/breadcrumb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getNewAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/oauth2/token/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refresh_token=${refreshToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("리프레시 토큰을 사용한 액세스 토큰 갱신 실패");
    }
    const accessToken = response.headers.get("set-cookie");
    return accessToken;
  } catch (error) {
    console.error("액세스 토큰 갱신 중 오류 발생:", error);
    return null;
  }
}

async function getGathering(id: number) {
  let accessToken = (await cookies()).get("access_token")?.value;
  const refreshToken = (await cookies()).get("refresh_token")?.value;

  if (!accessToken && !refreshToken) {
    redirect("/auth/signin");
  }

  if (!accessToken) {
    const newAccessToken = await getNewAccessToken(refreshToken as string);
    accessToken = newAccessToken as string;
  }

  let response = await fetch(
    `${process.env.BACKEND_URL}/api/gatherings/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (response.status != 401 && !response.ok) {
    throw new Error("서버 에러");
  }

  // 액세스 토큰이 만료된 경우
  if (response.status === 401 && refreshToken) {
    const newAccessToken = await getNewAccessToken(refreshToken);

    if (newAccessToken) {
      // 새로 발급받은 액세스 토큰으로 다시 요청
      response = await fetch(
        `${process.env.BACKEND_URL}/api/gatherings/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `access_token=${newAccessToken}`,
          },
          cache: "no-store",
        },
      );
    } else {
      throw new Error("새로운 액세스 토큰 발급 실패");
    }

    if (!response.ok) {
      throw new Error("네트워크 응답이 좋지 않습니다.");
    }
  }
  return await response.json();
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { id } = params;
  const postId = Number(id);

  if (postId <= 0 || !Number.isSafeInteger(postId)) {
    throw new Error("페이지를 찾을 수 없습니다.");
  }

  return {
    title: "모임 상세페이지",
    description: "Solitour의 모임 상세 페이지",
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { id } = params;
  const postId = Number(id);

  if (postId <= 0 || !Number.isSafeInteger(postId)) {
    return NextResponse.json(
      { message: "페이지를 찾을 수 없습니다." },
      { status: 404 },
    );
  }
  const data = await getGathering(postId);

  return (
    <div className="m-auto flex min-h-[calc(100vh-25rem)] w-full max-w-[60rem] flex-col pb-[2.5rem]">
      <Breadcrumbs
        categories={[
          { label: "모임", href: "/gathering" },
          { label: "모임 상세", href: "" },
        ]}
      />
      <GatheringViewer postId={postId} data={data} />
      <GatheringRecommendationList data={data.gatheringRecommend} />
    </div>
  );
}
