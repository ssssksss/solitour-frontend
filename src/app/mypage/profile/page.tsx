import MyProfileContainer from "@/containers/mypage/MyProfileContainer";
import { userResponseDto } from "@/types/UserDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "마이페이지-프로필 설정",
  description: "Solitour 사용자 마이페이지-프로필 설정",
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
    throw new Error(response.statusText);
  }

  return response.json() as Promise<userResponseDto>;
}


  export default async function page() {
  const userInfo = await getUserInfo();
  
    return (
    <div
      className={
        "w-full px-[.5rem] pb-[2rem] pt-[2rem] min-h-[calc(100vh-25rem)]"
      }
    >
        <MyProfileContainer userInfo={userInfo} />
    </div>
  );
}
              