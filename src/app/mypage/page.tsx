import MyPageTabMenu from "@/components/mypage/MyPageTabMenu";
import { MyPageHeader } from "@/widgets/myPageHeader";
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

  if (mainCategory === undefined || category === undefined) {
    throw new Error("Not Found");
  }

  return (
    <main className="flex min-h-[calc(100vh-25rem)] w-full flex-col pb-[2.5rem]">
      <MyPageHeader />
      <MyPageTabMenu defaultActive={mainCategory === "정보" ? 0 : 1} />
    </main>
  );
}
