import MyProfileContainer from "@/containers/mypage/MyProfileContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지-프로필 설정",
  description: "Solitour 사용자 마이페이지-프로필 설정",
};

export default function page() {
  return (
    <main
      className={
        "flex w-full flex-col items-center px-[.5rem] pb-[2rem] pt-[2rem] lg:px-[0rem]"
      }
    >
      <MyProfileContainer />
    </main>
  );
}
              