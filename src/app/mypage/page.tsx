import { MyPagePage } from "@/views/mypage/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "Solitour 사용자 마이페이지",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { mainCategory, category } = await searchParams;

  if (
    (mainCategory !== "정보" && mainCategory !== "모임") ||
    category === undefined
  ) {
    throw new Error("Not Found");
  }

  return <MyPagePage mainCategory={mainCategory} />;
}
