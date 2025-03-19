import MyPageProfile from "@/components/mypage/profile/MyPageProfile";
import { getUserInfo } from "@/entities/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로필 설정",
  description: "Solitour 사용자 마이페이지-프로필 설정",
};

export default async function Page() {
  const userInfo = await getUserInfo();

  return (
    <div className={"min-h-[calc(100vh-25rem)] w-full px-[.5rem] pb-[2.5rem]"}>
      <MyPageProfile userInfo={userInfo} />
    </div>
  );
}
