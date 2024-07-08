
import SignInContainer from "@/containers/auth/SignInContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 페이지",
  description: "Solitour 사용자 로그인 페이지",
};

export default function page() {
  return (
    <main
      className={
        "flex w-full flex-col items-center px-[.5rem] pt-[3rem] lg:px-[0rem]"
      }
      style={{ minHeight: "calc(100vh - 30rem)" }}
    >
      <SignInContainer />
    </main>
  );
}
              