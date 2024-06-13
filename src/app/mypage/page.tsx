import MyPageHeaderContainer from "@/containers/mypage/MyPageHeaderContainer";
import MyPageMainContainer from "@/containers/mypage/MyPageMainContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "Solitour 사용자 마이페이지",
};

export default function page() {
  return (
    <main className={"w-full flex flex-col items-center pt-[2rem] pb-[2rem] px-[.5rem] lg:px-[0rem] "}>
      <MyPageHeaderContainer />
      <MyPageMainContainer />
    </main>
  );
}
              