import MyPageHeaderContainer from "@/containers/mypage/MyPageHeaderContainer";
import MyPageMainContainer from "@/containers/mypage/MyPageMainContainer";
import { userResponseDto } from "@/types/UserDto";
import { fetchWithTokenRefreshSSR } from "@/utils/getNewAccessTokenAndRerequest";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "Solitour 사용자 마이페이지",
};

async function getUserInfo() {

  const access_token = (await cookies()).get("access_token");
  const refresh_token = (await cookies()).get("refresh_token");
  const response = await fetchWithTokenRefreshSSR<userResponseDto>({
    url: `${process.env.BACKEND_URL}/api/users/info`,
    accessToken: access_token,
    refreshToken: refresh_token,
  });

  return response;
}


export default async function page() {
  const userInfo = await getUserInfo();
  return (
    <main
      className={
        "flex min-h-[calc(100vh-25rem)] w-full flex-col pb-[2.5rem]"
      }
    >
      <MyPageHeaderContainer userInfo={userInfo} /> 
      <MyPageMainContainer />
    </main>
  );
}
              