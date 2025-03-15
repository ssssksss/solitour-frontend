import MyPageHeader from "@/components/mypage/MyPageHeader";
import MyPageTabMenu from "@/components/mypage/MyPageTabMenu";
import { User } from "@/entities/user/model/user";
import { fetchWithTokenRefreshSSR } from "@/shared/api/getNewAccessTokenAndRerequest";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "Solitour 사용자 마이페이지",
};

async function getUserInfo() {
  const accessToken = (await cookies()).get("access_token");
  const refreshToken = (await cookies()).get("refresh_token");
  const response = await fetchWithTokenRefreshSSR<User>({
    url: `${process.env.BACKEND_URL}/api/users/info`,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });

  return response;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const userInfo = await getUserInfo();
  const { mainCategory, category } = await searchParams;

  if (mainCategory === undefined || category === undefined) {
    throw new Error("Not Found");
  }

  return (
    <main className="flex min-h-[calc(100vh-25rem)] w-full flex-col pb-[2.5rem]">
      <MyPageHeader userInfo={userInfo} />
      <MyPageTabMenu defaultActive={mainCategory === "정보" ? 0 : 1} />
    </main>
  );
}
