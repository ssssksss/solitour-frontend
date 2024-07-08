import SignUpContainer from "@/containers/auth/SignUpContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입 페이지",
  description: "Solitour 사용자 회원가입 페이지",
};

export default function page() {
  return (
        <main
      className={
        "flex w-full flex-col items-center "
      }
      style={{ minHeight: "calc(100vh - 30rem)" }}
    >
    <SignUpContainer />
    </main>
  );
}
              