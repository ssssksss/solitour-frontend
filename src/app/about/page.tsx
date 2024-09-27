import { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스소개",
  description: "Solitour의 서비스소개 페이지",
};

export default function page() {
  return <div className="h-20 w-full bg-main"></div>;
}
