import MyPageHeaderContainer from "@/containers/mypage/MyPageHeaderContainer";
import MyPageMainContainer from "@/containers/mypage/MyPageMainContainer";
import { userResponseDto } from "@/types/UserDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "Solitour 사용자 마이페이지",
};

async function getUserInfo() {
  const cookie = cookies().get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/users/info`,
    {
      method: "GET",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    },
  );

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error(response.statusText);
  }

  return response.json() as Promise<userResponseDto>;
}


export default async function page() {
  const userInfo = await getUserInfo();
  return (
    <main
      className={
        "flex min-h-[calc(100vh-25rem)] w-full flex-col px-[5%] pb-[2rem] pt-[2rem] lg:px-[0rem]"
      }
    >
      <MyPageHeaderContainer userInfo={userInfo} /> 
      <MyPageMainContainer />
    </main>
  );
}
              