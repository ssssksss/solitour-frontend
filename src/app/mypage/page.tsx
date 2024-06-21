import MyPageHeaderContainer from "@/containers/mypage/MyPageHeaderContainer";
import MyPageMainContainer from "@/containers/mypage/MyPageMainContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "Solitour 사용자 마이페이지",
};

export default function page() {
  return (
    <main
      className={
        "flex min-h-[calc(100vh-25rem)] w-full flex-col items-center px-[5%] pb-[2rem] pt-[2rem] lg:px-[0rem]"
      }
    >
      <MyPageHeaderContainer />
      <MyPageMainContainer />
    </main>
  );
}
              