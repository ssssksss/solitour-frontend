import SupportQnADetailEditContainer from "@/containers/support/qna/SupportQnADetailEditContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "Solitour 사용자 마이페이지",
};

export default async function page() {
  return (
    <main
      className={
        "w-full mt-4 mb-8"
      }
      >
          <SupportQnADetailEditContainer />
    </main>
  );
}