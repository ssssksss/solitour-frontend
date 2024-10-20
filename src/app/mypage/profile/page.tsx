import MyProfileContainer from "@/containers/mypage/MyProfileContainer";
import { userResponseDto } from "@/types/UserDto";
import { fetchWithTokenRefreshSSR } from "@/utils/getNewAccessTokenAndRerequest";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "마이페이지-프로필 설정",
  description: "Solitour 사용자 마이페이지-프로필 설정",
};

async function getUserInfo() {
  const response = fetchWithTokenRefreshSSR<userResponseDto>({
    accessToken: cookies().get("access_token"),
    refreshToken: cookies().get("refresh_token"),
    url: `${process.env.BACKEND_URL}/api/users/info`,
    cache: "no-store",
  });

  return response;
}

export default async function page() {
  const userInfo = await getUserInfo();

  return (
    <div className={"min-h-[calc(100vh-25rem)] w-full px-[.5rem] pb-[2.5rem]"}>
      <MyProfileContainer userInfo={userInfo} />
    </div>
  );
}
