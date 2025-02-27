import SignIn from "@/components/auth/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "Solitour 사용자 로그인 페이지",
};

export default function page() {
  return (
    <main className="flex min-h-[calc(100vh-30rem)] w-full flex-col items-center justify-center">
      <SignIn />
    </main>
  );
}
